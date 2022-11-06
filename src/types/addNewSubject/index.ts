export interface ICandidate {
    id: string;
    candidateName: string;
}

/**
 * `IAddNewSubject` Add New Subject
 */
export interface IAddNewSubject {
    id: string;
    subjectName: string;
    submittedBy: string;
    userId: string;
    candidates: ICandidate[];
}
