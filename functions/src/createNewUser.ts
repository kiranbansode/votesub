/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import cloudFn from './index';

exports.createNewUser = cloudFn.https.onCall(async (newUserData) => {
    const { auth, firestore } = await import('firebase-admin');
    // const { HttpsError } = await import('firebase-functions/v1/auth');

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
        countryCode,
    } = newUserData;

    try {
        const res = await auth().createUser({
            email: newUserData.emailId,
            password: newUserData.password,
            displayName: `${firstName} ${lastName}`,
            phoneNumber: `${countryCode}${mob1}`,
        });

        if (res.uid) {
            await auth().setCustomUserClaims(res.uid, { userRole: newUserData.role });
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

        return res;
    } catch (error) {
        return error;
    }
});
