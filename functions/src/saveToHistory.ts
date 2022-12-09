/* eslint-disable import/extensions */
import cloudFn from './index';

exports.saveToHistory = cloudFn.https.onCall(async (data, context) => {
    const { firestore } = await import('firebase-admin');

    const userId = context.auth?.uid!;
    const { subjectId, candidateId, localeDate } = data;
    const { date, monthWithZero, year } = localeDate;
    const historyPath = `${date}${monthWithZero}${year}`;
    const daysSinceUnixEpoch = Math.floor(firestore.Timestamp.now().seconds / 86400);

    const historyRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('votingHistory')
        .doc(historyPath);
    const historyDoc = await historyRef.get();

    try {
        let res;
        if (!historyDoc.exists) {
            res = await historyRef.set({
                createdOn: firestore.Timestamp.now().seconds,
                historyPath,
                id: daysSinceUnixEpoch,
                localeDate,
                history: {
                    [subjectId]: {
                        [candidateId]: firestore.FieldValue.increment(1),
                        lastUpdatedOn: firestore.Timestamp.now().seconds,
                    },
                },
            });
            return res;
        }

        res = await historyRef.update({
            [`history.${subjectId}.${candidateId}`]: firestore.FieldValue.increment(1),
            [`history.${subjectId}.lastUpdatedOn`]: firestore.Timestamp.now().seconds,
        });
        return res;
    } catch (error) {
        return error;
    }
});
