import * as cloudFunctions from 'firebase-functions';
import * as admin from 'firebase-admin';

const clf = cloudFunctions.region('asia-south1');

admin.initializeApp();

exports.createNewUser = clf.https.onCall(async (data) => {
    const response = await admin.auth().createUser({
        email: data.emailId,
        password: data.password,
    });

    await admin.firestore().collection('users').doc(response.uid).set({
        email: data.emailId,
        userId: data.uid,
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
