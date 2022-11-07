/* eslint-disable import/extensions */

import * as cloudFunctions from 'firebase-functions';
import * as admin from 'firebase-admin';

/* -------------- Functions will always be deployed to Mumbai -------------- */
const cloudFn = cloudFunctions.region('asia-south1');
export default cloudFn;
/* ----------------------------------- End ---------------------------------- */

admin.initializeApp();

/* -------------------- Import Individual Cloud Functions ------------------- */
const addNewSubject = require('./addNewSubject');
const createNewUser = require('./createNewUser');
const getSubjectsList = require('./getSubjectsList');
const getTotalVotes = require('./getTotalVotes');
const voteNow = require('./voteNow');
/* ----------------------------------- End ---------------------------------- */

exports.addNewSubject = addNewSubject.addNewSubject;
exports.createNewUser = createNewUser.createNewUser;
exports.getSubjectsList = getSubjectsList.getSubjectsList;
exports.getTotalVotes = getTotalVotes.getTotalVotes;
exports.voteNow = voteNow.voteNow;
