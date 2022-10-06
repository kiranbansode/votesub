/* eslint-disable import/extensions */
import { HttpsError } from 'firebase-functions/v1/auth';
import clf from './index';

exports.createNewUser = clf.https.onCall(async (newUserData) => {
    const { auth, firestore } = await import('firebase-admin');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, confirmPassword, ...otherNewUserData } = newUserData;
    try {
        const { uid } = await auth().createUser({
            email: newUserData.emailId,
            password: newUserData.password,
        });

        auth().setCustomUserClaims(uid, { userRole: newUserData.role });

        if (uid) {
            await firestore()
                .collection('users')
                .doc(uid)
                .set({
                    /**
                     * otherNewUserData will save all details except password and confirmPassword
                     */
                    ...otherNewUserData,
                    uid,
                });
        }

        return { actor: 'auth', code: 201, message: 'User created successfully' };
    } catch (error) {
        throw new HttpsError('already-exists', 'Email ID is already exists. Try another Email ID');
    }
});
