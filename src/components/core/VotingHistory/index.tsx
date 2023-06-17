/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-body-style */
import Separator from 'components/UI/Separator';
import SingleSubjectVotingHistory from 'components/core/VotingHistory/SingleSubjectVotingHistory';

import './VotingHistory.styles.scss';
import { nanoid } from 'nanoid';

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

interface IDayHistory {
    subjectName: string;
    createdOn: number;
    localeDate: ILocaleDate;
    candidates: ICandidateVotingHistory[];
    id: string;
}

interface IVotingHistory {
    dayHistory: IDayHistory[];
}

const VotingHistory = ({ dayHistory }: IVotingHistory) => {
    const { date, year, shortMonth } = dayHistory[0].localeDate;

    return date ? (
        <div className="voting-history-container">
            <div className="date">{`${date} ${shortMonth} ${year}`}</div>
            <div className="timeline-road__container">
                <div className="timeline-road__1" />
                <div className="timeline-road__2" />
            </div>

            {dayHistory.map((subject) => (
                <SingleSubjectVotingHistory
                    candidates={subject.candidates}
                    createdOn={subject.createdOn}
                    key={subject.id || nanoid()}
                    localeDate={subject.localeDate}
                    subjectId={subject.id}
                    subjectName={subject.subjectName}
                />
            ))}
            <Separator />
        </div>
    ) : null;
};

export default VotingHistory;
