import convertUnixEpochToDate from 'utils/helperFunctions/convertUnixEpoch';
import { getTotalVotesCLF } from 'config/firebase';
import './VotingSubject.styles.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICandidate } from 'types/addNewSubject';

interface ISubject {
    id: string;
    createdOn: number;
    subjectName: string;
    submittedBy: string;
    candidates: ICandidate[];
}

interface IVotingSubject {
    subject: ISubject;
}

// eslint-disable-next-line arrow-body-style
const VotingSubject = ({ subject }: IVotingSubject) => {
    const navigate = useNavigate();
    const [totalVotes, setTotalVotes] = useState(null);
    const { subjectName, submittedBy, createdOn, candidates, id } = subject;
    const { day, month, year } = convertUnixEpochToDate(createdOn);

    useEffect(() => {
        // @ts-ignore
        getTotalVotesCLF(candidates).then(({ data }) => setTotalVotes(data));
    }, []);

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className="voting-subject-container" onClick={() => navigate(`/dashboard/${id}`)}>
            <div className="sect-1">
                <span>
                    {day}/{month}
                </span>
                <span>{year}</span>
            </div>
            <div className="sect-2">
                <span>{subjectName}</span>
                <span>By: {submittedBy}</span>
            </div>
            <div className="sect-3">
                <span>{totalVotes}</span>
                <span className="total-votes-title">Total Votes</span>
            </div>
        </div>
    );
};

export default VotingSubject;
