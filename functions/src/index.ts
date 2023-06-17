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
const refillVotes = require('./refillVotes');

// const getSubjectsList = require('./getSubjectsList');
// const getTotalVotes = require('./getTotalVotes');
// const voteNow = require('./voteNow');
// const saveToHistory = require('./saveToHistory');
// const getUserVotingHistory = require('./getUserVotingHistory');

/* ----------------------------------- End ---------------------------------- */

exports.addNewSubject = addNewSubject.addNewSubject;
exports.createNewUser = createNewUser.createNewUser;
exports.refillVotes = refillVotes.refillVotes;
// exports.getSubjectsList = getSubjectsList.getSubjectsList;
// exports.getTotalVotes = getTotalVotes.getTotalVotes;
// exports.voteNow = voteNow.voteNow;
// exports.saveToHistory = saveToHistory.saveToHistory;
// exports.getUserVotingHistory = getUserVotingHistory.getUserVotingHistory;
