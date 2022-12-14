import { firestore, auth } from 'config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import getSubjectDetails from 'utils/helperFunctions/getSubjectDetails';
import getSingleCandidateDetails from 'utils/helperFunctions/getSingleCandidateDetails';

const getUserVotingHistory = async () => {
    const userId = auth.currentUser?.uid!;
    const historyDataSnap = await getDocs(collection(firestore, 'users', userId, 'votingHistory'));

    const rawHistoryData: any[] = [];

    historyDataSnap.forEach((day) => rawHistoryData.push(day.data()));

    return Promise.all(
        rawHistoryData
            .map(async (dayHistory) => {
                const rawSubjects: [subjectId: string, candidates: { [x: string]: number }][] =
                    Object.entries(dayHistory?.history!);

                const createdOn: number = dayHistory?.createdOn;
                const localeDate = dayHistory?.localeDate;
                let lastUpdatedOn: number;

                return Promise.all(
                    rawSubjects
                        .map(async ([subjectId, candidates]) => {
                            const rawCandidates: [candidateId: string, givenVotes: number][] =
                                Object.entries(candidates!);
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

                                    const candidateData = await getSingleCandidateDetails(
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
            })
            /**
             * Sort user's voting history based on the day he votes.
             * Previous days will be shown at bottom
             */
            .sort((prevDay, currDay) =>
                // @ts-ignore
                prevDay[0]?.createdOn > currDay[0]?.createdOn ? 1 : -1,
            ),
    );
};

export default getUserVotingHistory;
