/* eslint-disable import/extensions */

import cloudFn from './index';

exports.getSubjectsList = cloudFn.https.onCall(async () => {
    const firestore = await import('firebase-admin/firestore');
    const db = firestore.getFirestore();
    const subjectsRef = db.collection('subjects');
    const subjectsSnapshot = await subjectsRef.get();

    // @ts-ignore
    const subjectsList = [];
    subjectsSnapshot.forEach((subject) => {
        subjectsList.push(subject.data());
    });

    // @ts-ignore
    return subjectsList;
});
