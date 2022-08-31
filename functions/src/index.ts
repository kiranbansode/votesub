/* eslint-disable import/extensions */

import * as cloudFunctions from 'firebase-functions';
import * as admin from 'firebase-admin';

const clf = cloudFunctions.region('asia-south1');
admin.initializeApp();
export default clf;

/* -------------------- Import Individual Cloud Functions ------------------- */
const addNewSubject = require('./addNewSubject');
const createNewUser = require('./createNewUser');
/* ----------------------------------- End ---------------------------------- */

exports.addNewSubject = addNewSubject.addNewSubject;
exports.createNewUser = createNewUser.createNewUser;
