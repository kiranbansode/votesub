/**
 * ICandidateData - Types for candidate data which will be fetched from server
 */
export interface ICandidateData {
    id: string;
    candidateName: string;
    votes: number;
    subjectId: string;
}

/**
 * ISubjectData - Types for subject data which will be fetched from server
 */
export interface ISubjectData {
    id: string;
    subjectName: string;
    submittedBy: string;
    userId: string;
    createdOn: number;
    candidates: string[];
}
