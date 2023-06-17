/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import cloudFn from './index';

exports.createNewUser = cloudFn.https.onCall(async (newUserData) => {
    const firebase = await import('firebase-admin');
    const { auth, firestore } = firebase;

    const {
        /**
         * password and confirmPassword will not be saved in firestore
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        password,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        confirmPassword,
        ...otherNewUserData
    } = newUserData;

    const {
        name: { firstName, lastName },
        mob1,
        userCategory,
    } = newUserData;

    try {
        let customToken;

        const res = await auth().createUser({
            email: newUserData.emailId,
            password: newUserData.password,
            displayName: `${firstName} ${lastName}`,
            phoneNumber: `${mob1}`,
        });

        if (res.uid) {
            customToken = await auth().createCustomToken(res.uid);
        }

        if (res.uid) {
            await auth().setCustomUserClaims(res.uid, { userCategory });
            await firestore()
                .collection('users')
                .doc(res.uid)
                .set({
                    // it will save all details except password and confirmPassword
                    ...otherNewUserData,
                    remainingVotes: 100,
                    uid: res.uid,
                });
        }

        return { auth: res, customToken };
    } catch (error) {
        return error;
    }
});
