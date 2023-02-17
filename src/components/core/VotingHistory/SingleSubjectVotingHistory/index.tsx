/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-body-style */
import { useNavigate } from 'react-router-dom';
import './SingleSubjectVotingHistory.styles.scss';

interface ILocaleDate {
    date: number;
    shortMonth: string;
    month: number;
    year: number;
    monthWithZero: number | string;
    fullMonth: string;
}

interface ICandidateVotingHistory {
    id: string;
    candidateName: string;
    givenVotes: number;
}

interface ISingleSubjectVotingHistory {
    subjectId: string;
    subjectName: string;
    createdOn: number;
    localeDate: ILocaleDate;
    candidates: ICandidateVotingHistory[];
}

const SingleSubjectVotingHistory = ({
    subjectId,
    subjectName,
    createdOn,
    localeDate,
    candidates,
}: ISingleSubjectVotingHistory) => {
    const navigate = useNavigate();
    const { date, shortMonth, year } = localeDate;

    return (
        <div className="single-subject-voting-history-container">
            <div className="subject-info__container">
                <p className="subject-info">
                    On &nbsp;
                    <span className="subject-info__date">{`${date} ${shortMonth} ${year}`}</span>
                    &nbsp; you voted on subject &nbsp;
                    <span
                        className="subject-info__name"
                        onClick={() => navigate(`/dashboard/${subjectId}`)}
                    >
                        {`${subjectName || 'Unknown'} `}
                    </span>
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
