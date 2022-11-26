/* eslint-disable import/extensions */

import cloudFn from './index';

exports.voteNow = cloudFn.https.onCall(async (id, context) => {
    const { firestore } = await import('firebase-admin');
    const { HttpsError } = await import('firebase-functions/v1/https');
    const candidateRef = firestore().collection('candidates').doc(id);
    const userRef = firestore().collection('users').doc(String(context.auth?.uid));
    const userData = (await userRef.get()).data();

    if (!context.auth?.uid) {
        throw new HttpsError('unauthenticated', 'Looks like you did not logged in.');
    }

    if (userData?.remainingVotes < 0 || userData?.remainingVotes === 0) {
        throw new HttpsError('resource-exhausted', 'You already gave your all votes');
    }

    try {
        let res;
        if (userData?.remainingVotes > 0) {
            res = await candidateRef.update({ votes: firestore.FieldValue.increment(1) });
        }
        return res;
    } catch (error) {
        return error;
    }
});
