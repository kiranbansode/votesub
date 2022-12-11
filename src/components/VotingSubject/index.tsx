import convertUnixEpochToDate from 'utils/helperFunctions/convertUnixEpochToDate';
import { getTotalVotesCLF } from 'config/firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';
import { ISubjectData } from 'types/subjectDetails';

import './VotingSubject.styles.scss';

interface IVotingSubject {
    subject: ISubjectData;
}

// eslint-disable-next-line arrow-body-style
const VotingSubject = ({ subject }: IVotingSubject) => {
    const navigate = useNavigate();
    const [totalVotes, setTotalVotes] = useState(null);
    const { subjectName, submittedBy, createdOn, candidates, id } = subject;
    const { day, month, year } = convertUnixEpochToDate(createdOn);

    useEffect(() => {
        if (candidates.length) {
            // @ts-ignore
            getTotalVotesCLF(candidates).then(({ data }) => setTotalVotes(data));
        }
    }, []);

    return totalVotes || totalVotes === 0 ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className="voting-subject-container" onClick={() => navigate(`/dashboard/${id}`)}>
            <div className="sect-1">
                <span>
                    {day}/{month}
                </span>
                <span>{year}</span>
            </div>
            <div className="sect-2">
                <span className="name">{subjectName}</span>
                <span className="submitter">By: {submittedBy}</span>
            </div>
            <div className="sect-3">
                {totalVotes || totalVotes === 0 ? (
                    <>
                        <span>{totalVotes}</span>
                        <span className="total-votes-title">Total Votes</span>
                    </>
                ) : (
                    <LoadingScreen size={25} />
                )}
            </div>
        </div>
    ) : (
        <LoadingScreen className="voting-subject__loading" color="success" size={25} />
    );
};

export default VotingSubject;
