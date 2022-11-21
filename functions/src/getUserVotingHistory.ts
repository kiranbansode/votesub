// eslint-disable-next-line import/extensions
import cloudFn from './index';

const getSubjectDetails = async (id: string) => {
    const { firestore } = await import('firebase-admin');
    const subjectRef = await firestore().collection('subjects').doc(id).get();

    return subjectRef.data();
};

const getCandidateDetails = async (id: string) => {
    const { firestore } = await import('firebase-admin');
    const subjectRef = await firestore().collection('candidates').doc(id).get();

    return subjectRef.data();
};

exports.getUserVotingHistory = cloudFn.https.onCall(async (_, context) => {
    const { firestore } = await import('firebase-admin');
    const userId = context.auth?.uid;
    const historyDataSnap = await firestore()
        .collection('users')
        .doc(`${userId}`)
        .collection('votingHistory')
        .get();
    const rawHistoryData: any[] = [];
    historyDataSnap.forEach((dayHistory) => rawHistoryData.push(dayHistory.data()));

    try {
        return Promise.all(
            rawHistoryData.map(async (dayHistory) => {
                const rawSubjects = Object.entries(dayHistory?.history!);
                const createdOn = dayHistory?.createdOn;

                return Promise.all(
                    rawSubjects.map(async ([subjectId, candidates]) => {
                        const rawCandidates = Object.entries(candidates!);
                        const subjectData = await getSubjectDetails(subjectId);
                        const candidatesData = await Promise.all(
                            rawCandidates.map(async ([candidateId, givenVotes]) => {
                                const candidateData = await getCandidateDetails(candidateId);

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
                            subjectName: subjectData?.subjectName,
                            candidates: candidatesData,
                        };
                    }),
                );
            }),
        );
    } catch (error) {
        return error;
    }
});
