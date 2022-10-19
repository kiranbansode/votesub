/* eslint-disable import/extensions */
import * as admin from 'firebase-admin';
import cloudFn from './index';

interface ICandidate {
    id: string;
    candidateName: string;
}
interface IAddNewSubject {
    id: string;
    subject: string;
    submittedBy: string;
    userId: string;
    candidates: ICandidate[];
}

function saveSubjectDetails({ id, candidates, subject, submittedBy, userId }: IAddNewSubject) {
    return admin
        .firestore()
        .collection('subjects')
        .doc(id)
        .set({
            id,
            subject,
            submittedBy,
            userId,
            candidates: candidates.map((candidate) => candidate.id),
        });
}

function saveCandidateDetails(candidates: ICandidate[]) {
    return candidates.map(({ id, candidateName }) =>
        admin.firestore().collection('candidates').doc(id).set({
            id,
            candidateName,
        }),
    );
}

exports.addNewSubject = cloudFn.https.onCall(async (data: IAddNewSubject, context) => {
    console.log(data, context.auth);

    try {
        await saveSubjectDetails(data);
        await saveCandidateDetails(data.candidates);
    } catch (error) {
        console.log(error);
    }
});
