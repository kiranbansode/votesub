/* eslint-disable import/extensions */
import * as admin from 'firebase-admin';
import clf from './index';

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

exports.addNewSubject = clf.https.onCall(async (data: IAddNewSubject, context) => {
    console.log(data, context.auth);

    try {
        // eslint-disable-next-line no-use-before-define
        const subjRes = await saveSubjectDetails(data);
        // eslint-disable-next-line no-use-before-define
        const candiRes = await saveCandidateDetails(data.candidates);
        console.log(subjRes, candiRes);
    } catch (error) {
        console.log(error);
    }
});

function saveSubjectDetails({
    id,
    candidates,
    subject,
    submittedBy,
    userId,
}: IAddNewSubject): Promise<any> {
    return admin
        .firestore()
        .collection('subjects')
        .doc(id)
        .set({
            id,
            subject,
            submittedBy,
            userId,
            // eslint-disable-next-line no-shadow
            candidates: candidates.map(({ id }) => id),
        });
}

function saveCandidateDetails(candidates: ICandidate[]) {
    console.log(candidates);

    return candidates.map(({ id, candidateName }) =>
        admin.firestore().collection('candidates').doc(id).set({
            id,
            candidateName,
        }),
    );
}
