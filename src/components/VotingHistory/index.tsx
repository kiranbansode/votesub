/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-body-style */
import Separator from 'components/Separator';
import convertUnixEpochToDate from 'utils/helperFunctions/convertUnixEpochToDate';
import SingleSubjectVotingHistory from 'components/VotingHistory/SingleDayVotingHistory';

import './VotingHistory.styles.scss';

interface ICandidateVotingHistory {
    id: string;
    candidateName: string;
    givenVotes: number;
}

interface IDayHistory {
    subjectName: string;
    createdOn: number;
    candidates: ICandidateVotingHistory[];
    id: string;
}

interface IVotingHistory {
    dayHistory: IDayHistory[];
}

const VotingHistory = ({ dayHistory }: IVotingHistory) => {
    const { day, year, month } = convertUnixEpochToDate(dayHistory[0]?.createdOn);

    return day ? (
        <div className="voting-history-container">
            <div className="date">{`${day}/${month}/${year}`}</div>
            <div className="timeline-road__container">
                <div className="timeline-road__1" />
                <div className="timeline-road__2" />
            </div>

            {dayHistory.map((subject) => (
                <SingleSubjectVotingHistory
                    candidates={subject.candidates}
                    createdOn={subject.createdOn}
                    key={subject.id}
                    subjectId={subject.id}
                    subjectName={subject.subjectName}
                />
            ))}
            <Separator />
        </div>
    ) : null;
};

export default VotingHistory;
