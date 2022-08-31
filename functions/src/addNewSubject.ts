/* eslint-disable import/extensions */
import * as admin from 'firebase-admin';
import clf from './index';

exports.addNewSubject = clf.https.onCall(async (data, context) => {
    try {
        const response = await admin
            .firestore()
            .collection('subjects')
            .doc(data.id)
            .set({
                ...data,
            });

        console.log(response);
    } catch (error) {
        console.log(error);
    }
});
