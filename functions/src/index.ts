import * as cloudFunctions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/auth';

const clf = cloudFunctions.region('asia-south1');

admin.initializeApp();

exports.createNewUser = clf.https.onCall(async (data) => {
    const { name, gender, dob, schoolName, std, div, mobileNo, altMobileNo, emailId, password } =
        data;

    try {
        const response = await admin.auth().createUser({
            email: emailId,
            password: password,
        });

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

        return 'User created successully';
    } catch (error) {
        throw new HttpsError('already-exists', 'Email ID is already exists. Try another Email ID');
    }
});

// exports.sendUserVerificationEmail = clf.auth.user().onCreate(async (user) => {
//     const { emailVerified, email } = user;
//     if (!emailVerified) {
//         return;
//     }

//     const link = await admin.auth().generateEmailVerificationLink(email!);
//     console.log(link);
// });
