/* eslint-disable import/extensions */
import { IAddNewSubject, ICandidate } from '../../src/types/addNewSubject/index';
import cloudFn from './index';

const saveSubjectDetails = async ({
    id,
    candidates,
    subjectName,
    submittedBy,
    userId,
}: IAddNewSubject) => {
    const { firestore } = await import('firebase-admin');

    return firestore()
        .collection('subjects')
        .doc(id)
        .set({
            id,
            submittedBy,
            userId,
            subjectName,
            candidates: candidates.map((candidate: ICandidate) => candidate.id),
            createdOn: firestore.Timestamp.now().seconds,
        });
};

const saveCandidateDetails = async (candidates: ICandidate[], subjectId: string) => {
    const { firestore } = await import('firebase-admin');

    return Promise.all(
        candidates.map(async ({ id, candidateName }) =>
            firestore().collection('candidates').doc(id).set({
                id,
                candidateName,
                votes: 0,
                subjectId,
            }),
        ),
    );
};

// eslint-disable-next-line consistent-return
exports.addNewSubject = cloudFn.https.onCall(async (subject: IAddNewSubject, context) => {
    const { HttpsError } = await import('firebase-functions/v1/https');

    if (!context.auth?.uid) {
        throw new HttpsError(
            'unauthenticated',
            'You are not authorized to submit a subject for voting.',
        );
    }

    try {
        const { writeTime: subjectWriteTime } = await saveSubjectDetails(subject);
        const candidatesRes = await saveCandidateDetails(subject.candidates, subject.id);

        return {
            subjectId: subject.id,
            sub: subjectWriteTime.seconds,
            candidates: candidatesRes.map((candidate) => candidate.writeTime.seconds),
        };
    } catch (error) {
        return error;
    }
});
