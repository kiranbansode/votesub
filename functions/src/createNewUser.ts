/* eslint-disable import/extensions */
import { HttpsError } from 'firebase-functions/v1/auth';
import cloudFn from './index';

exports.createNewUser = cloudFn.https.onCall(async (newUserData) => {
    const { auth, firestore } = await import('firebase-admin');
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
        const { uid } = await auth().createUser({
            email: newUserData.emailId,
            password: newUserData.password,
            displayName: `${firstName} ${lastName}`,
            phoneNumber: `${countryCode}${mob1}`,
        });

        auth().setCustomUserClaims(uid, { userRole: newUserData.role });

        if (uid) {
            await firestore()
                .collection('users')
                .doc(uid)
                .set({
                    // it will save all details except password and confirmPassword
                    ...otherNewUserData,
                    remainingVotes: 100,
                    uid,
                });
        }

        return { actor: 'auth', code: 201, message: 'User created successfully' };
    } catch (error) {
        throw new HttpsError('already-exists', 'Email ID is already exists. Try another Email ID');
    }
});
