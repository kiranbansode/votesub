import cloudFn from '.';

exports.refillVotes = cloudFn.pubsub
    // Every day at 12:00 AM
    .schedule('0 0 * * *')
    // As per UTC 00:00
    .timeZone('Etc/UTC')
    .onRun(async () => {
        const { firestore } = await import('firebase-admin');
        const usersRef = firestore().collection('users');
        const usersId: string[] = [];

        (await usersRef.get()).forEach((userDoc) => {
            const userId = userDoc.get('uid');
            usersId.push(userId);
        });

        if (usersId.length > 0) {
            Promise.all(
                usersId.map(async (userId) => {
                    const userRef = firestore().collection('users').doc(userId);
                    const res = await userRef.update('remainingVotes', 100);
                    return res;
                }),
            );
        }
    });
