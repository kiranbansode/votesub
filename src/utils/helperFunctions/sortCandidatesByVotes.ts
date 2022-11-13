import { ICandidateData } from 'types/subjectDetails';

/**
 * Sort candidates by number of votes - From highest to lowest
 * @param {ICandidateData[]} candidates array of candidates details.
 * @return sorted array by number of votes
 */
const sortCandidatesByVotes = (candidates: ICandidateData) =>
    // @ts-ignore
    candidates.sort((prev, curr) => (prev.votes > curr.votes ? -1 : 1));

export default sortCandidatesByVotes;
