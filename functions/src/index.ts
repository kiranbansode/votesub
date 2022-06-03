import * as cloudFunctions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v1/auth';
const clf = cloudFunctions.region('asia-south1');

admin.initializeApp();

exports.createNewUser = clf.https.onCall(async (data, context) => {
    if (context.app === undefined) {
        throw new HttpsError(
            'failed-precondition',
            'The function must be called from an App Check verified app.',
        );
    }
    const response = await admin.auth().createUser({
        email: data.emailId,
        password: data.password,
    });
    return response;
});

// exports.sendUserVerificationEmail = clf.auth.user().onCreate(async (user) => {
//     const { emailVerified, email } = user;
//     if (!emailVerified) {
//         return;
//     }

//     const link = await admin.auth().generateEmailVerificationLink(email!);
//     console.log(link);
// });
