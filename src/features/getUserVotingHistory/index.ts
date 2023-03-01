import { firestore, auth } from 'config/firebase';
import { getDocs, collection, CollectionReference } from 'firebase/firestore';
import getSubjectDetails from 'features/getSubjectDetails';
import getSingleCandidateDetails from 'features/getSingleCandidateDetails';

interface ISingleCandidateHistory {
    [x: string]: {
        candidateId: string;
        candidateName: string;
        givenVotes: number;
    };
}

type TSingleSubjectHistory = ISingleCandidateHistory & {
    lastUpdateOn: number;
    subjectName: string;
};

interface IDayHistoryFromFirestore {
    createdOn: number;
    history: {
        [x: string]: TSingleSubjectHistory;
    };
    historyPath: string;
    id: number;
    localeDate: {
        date: number;
        dateWithZero: number;
        fullMonth: string;
        month: number;
        monthWithZero: string;
        shortMonth: string;
        year: number;
    };
}

const getUserVotingHistory = async () => {
    const userId = auth.currentUser?.uid!;
    const historyDataSnap = await getDocs(
        collection(
            firestore,
            'users',
            userId,
            'votingHistory',
        ) as CollectionReference<IDayHistoryFromFirestore>,
    );

    const rawHistoryData: IDayHistoryFromFirestore[] = [];

    historyDataSnap.forEach((day) => rawHistoryData.push(day.data()));

    if (historyDataSnap.empty) {
        throw new Error("User's voting history not found");
    }

    return Promise.all(
        rawHistoryData
            .map(async (dayHistory) => {
                const rawSubjects: [subjectId: string, candidate: TSingleSubjectHistory][] =
                    Object.entries(dayHistory?.history!);

                const createdOn: number = dayHistory?.createdOn;
                const localeDate = dayHistory?.localeDate;
                let lastUpdatedOn: number;
                let subjectNameFromHistory: string;
                let candidateNameFromHistory: string;

                return Promise.all(
                    rawSubjects
                        .map(async ([subjectId, candidates]) => {
                            const subjectData: any = await getSubjectDetails(subjectId);
                            const rawCandidates = Object.entries(candidates!);

                            const candidatesData = await Promise.all(
                                rawCandidates.map(async ([candidateId, givenVotes]) => {
                                    if (candidateId === 'lastUpdatedOn') {
                                        /**
                                         * Here `candidateId` is going to be `lastUpdatedOn`, not an
                                         * actual candidateId and `givenVotes` will be `Firestore timestamp`
                                         * at which a particular subject's voting history is changed.
                                         */
                                        // @ts-ignore
                                        lastUpdatedOn = givenVotes;
                                        return null;
                                    }

                                    if (candidateId === 'subjectName') {
                                        /**
                                         * Here `candidateId` is going to be `subjectName`, not an
                                         * actual candidateId and `givenVotes` will be actual subject name.
                                         */
                                        // @ts-ignore
                                        subjectNameFromHistory = givenVotes;
                                        return null;
                                    }

                                    // @ts-ignore
                                    const candidateData = await getSingleCandidateDetails(
                                        /**
                                         * Here `candidateId` is going to actual candidate ID which will
                                         * be present in Firestore.
                                         */
                                        candidateId,
                                    );

                                    /**
                                     * Here `givenVotes` will be and object containing `candidateId`,
                                     * `candidateName` and `givenVotes` properties
                                     */
                                    candidateNameFromHistory = givenVotes.candidateName;

                                    return {
                                        id: candidateData?.id,
                                        /**
                                         * If somehow candidate got delete from Firestore, user
                                         * still can see candidateName instead of Unknown
                                         */
                                        candidateName:
                                            candidateData?.candidateName ||
                                            candidateNameFromHistory,
                                        /**
                                         * Here givenVotes will be a raw singleCandidate object
                                         * which is going to contain `candidateId`, `candidateName`
                                         * and `givenVotes` properties
                                         */
                                        givenVotes: givenVotes.givenVotes,
                                    };
                                }),
                            );

                            return {
                                id: subjectData?.id,
                                createdOn,
                                localeDate,
                                lastUpdatedOn,
                                subjectName: subjectData?.subjectName || subjectNameFromHistory,
                                candidates: candidatesData
                                    /**
                                     * It will filter out lastUpdateOn timestamp from candidates
                                     * array. If we did not filtered it out, then front end will
                                     * crash.
                                     */
                                    .filter((candidate) => candidate !== null)
                                    /**
                                     * Sort candidates bases on their total given votes from highest
                                     * to lowest
                                     */
                                    // @ts-ignore
                                    .sort((a, b) => (a.givenVotes > b.givenVotes ? -1 : 1)),
                            };
                        })
                        .sort((prevSub, currSub) =>
                            /**
                             * Sort subjects bases on when user last voted on.
                             * Last one will be on top
                             */
                            // @ts-ignore
                            prevSub.lastUpdatedOn > currSub.lastUpdatedOn ? 1 : -1,
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
