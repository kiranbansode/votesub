import * as cloudFunctions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/auth';

const clf = cloudFunctions.region('asia-south1');

admin.initializeApp();

exports.createNewUser = clf.https.onCall(async (data) => {
    try {
        const response = await admin.auth().createUser({
            email: data.emailId,
            password: data.password,
        });

        if (response.uid) {
            await admin.firestore().collection('users').doc(response.uid).set({
                email: response.email,
                userId: response.uid,
            });
        }

        return 'User created successully';
    } catch (error) {
        throw new HttpsError('already-exists', 'User already exists');
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
