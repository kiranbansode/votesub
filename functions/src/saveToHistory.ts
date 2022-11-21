/* eslint-disable import/extensions */
import cloudFn from './index';

exports.saveToHistory = cloudFn.https.onCall(async (data, context) => {
    const { subjectId, candidateId } = data;
    const userId = context.auth?.uid!;
    const { firestore } = await import('firebase-admin');
    const daysSinceUnixEpoch = Math.floor(firestore.Timestamp.now().seconds / 86400);
    const historyRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('votingHistory')
        .doc(`${daysSinceUnixEpoch}`);
    const historyDoc = await historyRef.get();

    try {
        let res;
        if (!historyDoc.exists) {
            res = await historyRef.set({
                createdOn: firestore.Timestamp.now().seconds,
                id: daysSinceUnixEpoch,
                history: {
                    [subjectId]: {
                        [candidateId]: firestore.FieldValue.increment(1),
                    },
                },
            });
            return res;
        }

        res = await historyRef.update({
            [`history.${subjectId}.${candidateId}`]: firestore.FieldValue.increment(1),
        });
        return res;
    } catch (error) {
        return error;
    }
});
