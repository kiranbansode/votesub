import { HttpsError } from 'firebase-functions/v1/auth';
import cloudFn from '.';

exports.reduceVotes = cloudFn.https.onCall(async (userId, context) => {
    if (!context.auth?.uid) {
        throw new HttpsError('unauthenticated', 'Invalid Auth Object');
    }

    const { firestore } = await import('firebase-admin');
    const user = firestore().collection('users').doc(userId);
    const userRef = await user.get();
    const userData = userRef.data();

    if (userData?.remainingVotes < 0 || userData?.remainingVotes === 0) {
        throw new HttpsError('resource-exhausted', 'You already gave your all votes');
    }

    try {
        let res;
        if (userData?.remainingVotes > 0) {
            res = await user.update({ remainingVotes: firestore.FieldValue.increment(-1) });
        }
        return res;
    } catch (error) {
        return error;
    }
});
