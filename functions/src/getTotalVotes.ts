/* eslint-disable import/extensions */
import cloudFn from './index';

exports.getTotalVotes = cloudFn.https.onCall(async (candidates: string[]) => {
    const { firestore } = await import('firebase-admin');
    const candidatesRef = firestore().collection('candidates');

    const getCandidateVotes = async (candidate: string) => {
        const candidateRef = await candidatesRef.doc(candidate).get();
        const candidateDetails = candidateRef.data();
        return candidateDetails?.votes;
    };

    const totalVotes =
        /**
         * You will find more info about Why it is necessary to use Promise.all() for map() ?
         * here https://stackoverflow.com/a/61315261/12763301
         */
        (await Promise.all(candidates.map((candidate) => getCandidateVotes(candidate)))).reduce(
            (prevVal, currVal) => prevVal + currVal,
        );

    return totalVotes;
});
