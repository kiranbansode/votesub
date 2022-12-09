import cloudFn from '.';

exports.voteNow = cloudFn.https.onCall(async (candidateId, context) => {
    const { firestore } = await import('firebase-admin');
    const { HttpsError } = await import('firebase-functions/v1/https');

    const userId = context.auth?.uid;
    const candidateRef = firestore().collection('candidates').doc(candidateId);
    const userRef = firestore().collection('users').doc(String(userId));
    const userData = (await userRef.get()).data();

    if (!context.auth?.uid) {
        throw new HttpsError('unauthenticated', 'Looks like you are not logged in.');
    }

    if (userData?.remainingVotes < 0 || userData?.remainingVotes === 0) {
        throw new HttpsError('resource-exhausted', 'You already gave all of your votes');
    }

    try {
        let candidateVotes;
        let userRemainingVotes;

        if (userData?.remainingVotes > 0) {
            /* This will increment candidate votes by 1 */
            candidateVotes = await candidateRef.update({
                votes: firestore.FieldValue.increment(1),
            });

            /* This will decrement user's remaining votes by 1 */
            userRemainingVotes = await userRef.update({
                remainingVotes: firestore.FieldValue.increment(-1),
            });
        }

        return { candidateVotes, userRemainingVotes };
    } catch (error) {
        return error;
    }
});
