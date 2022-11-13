/* eslint-disable import/extensions */
import * as admin from 'firebase-admin';
import { CallableContext, HttpsError } from 'firebase-functions/v1/https';
import { IAddNewSubject, ICandidate } from '../../src/types/addNewSubject/index';
import cloudFn from './index';

const saveSubjectDetails = ({ id, candidates, subjectName, submittedBy, userId }: IAddNewSubject) =>
    admin
        .firestore()
        .collection('subjects')
        .doc(id)
        .set({
            id,
            submittedBy,
            userId,
            subjectName,
            candidates: candidates.map((candidate: ICandidate) => candidate.id),
            createdOn: admin.firestore.Timestamp.now().seconds,
        });

const saveCandidateDetails = (candidates: ICandidate[], subjectId: string) =>
    candidates.map(async ({ id, candidateName }) =>
        admin.firestore().collection('candidates').doc(id).set({
            id,
            candidateName,
            votes: 0,
            subjectId,
        }),
    );

exports.addNewSubject = cloudFn.https.onCall(
    async (subject: IAddNewSubject, context: CallableContext) => {
        if (!context.auth?.uid) {
            throw new HttpsError(
                'unauthenticated',
                'You are not authorized to submit a subject for voting.',
            );
        }

        try {
            saveSubjectDetails(subject);
            saveCandidateDetails(subject.candidates, subject.id);

            return {
                code: 201,
                actor: 'ADD_NEW_SUBJECT_CLOUD_FN',
                mssg: 'Subject was added Successfully',
                subjectId: subject.id,
            };
        } catch (error) {
            return error;
        }
    },
);
