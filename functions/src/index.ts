/* eslint-disable import/extensions */

import * as cloudFunctions from 'firebase-functions';
import * as admin from 'firebase-admin';

/* -------------- Functions will always be deployed to Mumbai -------------- */
const clf = cloudFunctions.region('asia-south1');
export default clf;
/* ----------------------------------- End ---------------------------------- */

admin.initializeApp();

/* -------------------- Import Individual Cloud Functions ------------------- */
const addNewSubject = require('./addNewSubject');
const createNewUser = require('./createNewUser');
/* ----------------------------------- End ---------------------------------- */

exports.addNewSubject = addNewSubject.addNewSubject;
exports.createNewUser = createNewUser.createNewUser;
