/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-body-style */
import { useNavigate } from 'react-router-dom';
import convertUnixEpochToDate from 'utils/helperFunctions/convertUnixEpochToDate';
import './SingleSubjectVotingHistory.styles.scss';

interface ICandidateVotingHistory {
    id: string;
    candidateName: string;
    givenVotes: number;
}

interface ISingleSubjectVotingHistory {
    subjectId: string;
    subjectName: string;
    createdOn: number;
    candidates: ICandidateVotingHistory[];
}

const SingleSubjectVotingHistory = ({
    subjectId,
    subjectName,
    createdOn,
    candidates,
}: ISingleSubjectVotingHistory) => {
    const navigate = useNavigate();
    const { day, shortMonth } = convertUnixEpochToDate(Number(createdOn));

    return (
        <div className="single-subject-voting-history-container">
            <div className="subject-info__container">
                <p className="subject-info">
                    On &nbsp;
                    <span className="subject-info__date">{`${day} ${shortMonth} - UTC`}</span>
                    &nbsp; you voted on &nbsp;
                    <span
                        className="subject-info__name"
                        onClick={() => navigate(`/dashboard/${subjectId}`)}
                    >
                        {`${subjectName} `}
                    </span>
                    &nbsp; subject.
                </p>
                <p className="candidates-info"> You gave your votes to following candidates :</p>

                <ul className="candidates-list">
                    {candidates.map(({ id, candidateName, givenVotes }) => (
                        <li className="candidate" key={id}>
                            {candidateName} : {givenVotes}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="after-timeline" />
        </div>
    );
};

export default SingleSubjectVotingHistory;
