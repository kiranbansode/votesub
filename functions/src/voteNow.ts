/* eslint-disable import/extensions */

import cloudFn from './index';

exports.voteNow = cloudFn.https.onCall(async (id, context) => {
    const { firestore } = await import('firebase-admin');
    const { HttpsError } = await import('firebase-functions/v1/https');
    const candidateRef = firestore().collection('candidates').doc(id);

    if (!context.auth?.uid) {
        throw new HttpsError('unauthenticated', 'Looks like you did not logged in.');
    }

    try {
        const res = await candidateRef.update({ votes: firestore.FieldValue.increment(1) });
        return res;
    } catch (error) {
        return error;
    }
});
