// eslint-disable-next-line import/extensions
import cloudFn from './index';

const getSubjectDetails = async (id: string) => {
    const { firestore } = await import('firebase-admin');
    const subjectRef = await firestore().collection('subjects').doc(id).get();

    return subjectRef.data();
};

const getCandidateDetails = async (id: string) => {
    const { firestore } = await import('firebase-admin');
    const candidateRef = await firestore().collection('candidates').doc(id).get();

    return candidateRef.data();
};

exports.getUserVotingHistory = cloudFn.https.onCall(async (_, context) => {
    const { firestore } = await import('firebase-admin');
    const { HttpsError } = await import('firebase-functions/v1/https');

    if (context.auth === null) {
        throw new HttpsError(
            'unauthenticated',
            'You are not authenticated. Please first login and then try again',
        );
    }

    const userId = context.auth?.uid;
    const historyDataSnap = await firestore()
        .collection('users')
        .doc(`${userId}`)
        .collection('votingHistory')
        .get();
    const rawHistoryData: any[] = [];

    historyDataSnap.forEach((dayHistory) => {
        rawHistoryData.push(dayHistory.data());
    });

    try {
        if (historyDataSnap.empty) {
            throw new HttpsError(
                'not-found',
                "User's voting history not found.",
                'Looks like you did not give any votes to any given Subjects or Candidates. First give votes to your favorite Subjects or Candidates, then come back here.',
            );
        }

        const res = Promise.all(
            /**
             * All Documents which are available in user's votingHistory collection.
             */
            rawHistoryData
                .map(
                    async (
                        /**
                         * actual history object from firestore whose key-value pair are nothing but subjectId
                         * and an object respectively whose key-value pair are candidateId and givenVotes
                         *
                         * e.g.
                         * history: {
                         *  subjectId: {
                         *      candidateId_1: givenVotes,
                         *      candidateId_2: givenVotes,
                         *     }
                         * }
                         *
                         */
                        dayHistory,
                    ) => {
                        const rawSubjects: [
                            subjectId: string,
                            candidates: { [x: string]: number },
                        ][] = Object.entries(dayHistory?.history!);

                        const createdOn: number = dayHistory?.createdOn;
                        const localeDate = dayHistory?.localeDate;
                        let lastUpdatedOn: number;

                        return Promise.all(
                            rawSubjects
                                .map(async ([subjectId, candidates]) => {
                                    const rawCandidates: [
                                        candidateId: string,
                                        givenVotes: number,
                                    ][] = Object.entries(candidates!);
                                    const subjectData = await getSubjectDetails(subjectId);
                                    const candidatesData = await Promise.all(
                                        rawCandidates.map(async ([candidateId, givenVotes]) => {
                                            if (candidateId === 'lastUpdatedOn') {
                                                /**
                                                 * Here `candidateId[key]` is going to be `lastUpdatedOn`, not and actual candidateId.
                                                 * `givenVotes` will be `firestore timestamp` at which a particular subject's voting
                                                 * history is changed.
                                                 */
                                                lastUpdatedOn = givenVotes;
                                                return null;
                                            }

                                            const candidateData = await getCandidateDetails(
                                                candidateId,
                                            );

                                            return {
                                                id: candidateData?.id,
                                                candidateName: candidateData?.candidateName,
                                                givenVotes,
                                            };
                                        }),
                                    );

                                    return {
                                        id: subjectData?.id,
                                        createdOn,
                                        localeDate,
                                        lastUpdatedOn,
                                        subjectName: subjectData?.subjectName,
                                        candidates: candidatesData
                                            /**
                                             * It will filter out lastUpdateOn timestamp from candidates array.
                                             * If we did not filtered it out, then front end will crash.
                                             */
                                            .filter((candidate) => candidate !== null)
                                            /**
                                             * Sort candidates bases on their total given votes from highest to lowest
                                             */
                                            // @ts-ignore
                                            .sort((a, b) => (a.givenVotes > b.givenVotes ? -1 : 1)),
                                    };
                                })
                                .sort((prevSub, currSub) =>
                                    /**
                                     * Sort subjects bases on when user last voted on. Last one will be on top
                                     */
                                    // @ts-ignore
                                    prevSub.lastUpdatedOn > currSub.lastUpdateOn ? 1 : -1,
                                ),
                        );
                    },
                )
                /**
                 * Sort user's voting history based on the day he votes.
                 * Previous days will be shown at bottom
                 */
                .sort((prevDay, currDay) =>
                    // @ts-ignore
                    prevDay[0]?.createdOn > currDay[0]?.createdOn ? 1 : -1,
                ),
        );

        return res;
    } catch (error) {
        return error;
    }
});
