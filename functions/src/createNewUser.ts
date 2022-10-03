/* eslint-disable import/extensions */
import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/auth';
import clf from './index';

exports.createNewUser = clf.https.onCall(async (data) => {
    const {
        name,
        gender,
        dob,
        schoolName,
        std,
        div,
        mobileNo,
        altMobileNo,
        emailId,
        password,
        role,
    } = data;

    try {
        const response = await admin.auth().createUser({
            email: emailId,
            password,
        });

        admin.auth().setCustomUserClaims(response.uid, { role });

        if (response.uid) {
            await admin.firestore().collection('users').doc(response.uid).set({
                name,
                gender,
                dob,
                schoolName,
                std,
                div,
                mobileNo1: mobileNo,
                mobileNo2: altMobileNo,
                email: response.email,
                userId: response.uid,
            });
        }

        return { actor: 'auth', code: 201, message: 'User created successully' };
    } catch (error) {
        throw new HttpsError('already-exists', 'Email ID is already exists. Try another Email ID');
    }
});
