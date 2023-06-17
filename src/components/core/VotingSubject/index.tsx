import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from 'components/UI/LoadingScreen';
import { ISubjectData } from 'types/subjectDetails';
import useGetTotalVotes from 'hooks/useGetTotalVotes';
import useWindowDimensions from 'hooks/useWindowDimensions';
import convertUnixEpochToDate from 'utils/helperFunctions/convertUnixEpochToDate';

import './VotingSubject.styles.scss';
import useAppSelector from 'hooks/useAppSelector';

interface IVotingSubject {
    subject: ISubjectData;
}

// eslint-disable-next-line arrow-body-style
const VotingSubject = ({ subject }: IVotingSubject) => {
    const navigate = useNavigate();
    const { uid: userId } = useAppSelector(({ user }) => user.userDetails);
    const { subjectName, submittedBy, createdOn, id } = subject;
    const totalVotes = useGetTotalVotes(id);
    const { day, month, year } = convertUnixEpochToDate(createdOn);
    const { width: windowWidth } = useWindowDimensions();

    const changeSubjectNameWidth = () => {
        const subjectsLabel = document.querySelectorAll('.voting-subject__name');

        subjectsLabel.forEach((subjectLabel) => {
            if (windowWidth! >= 600) {
                // @ts-ignore
                // eslint-disable-next-line no-param-reassign
                subjectLabel.style.maxWidth = `350px`;
                return;
            }
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            subjectLabel.style.maxWidth = `${windowWidth - 195}px`;
        });
    };

    useEffect(() => {
        changeSubjectNameWidth();
    }, [windowWidth]);

    return (totalVotes || totalVotes === 0) && userId ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className="voting-subject-container" onClick={() => navigate(`/dashboard/${id}`)}>
            <div className="sect-1">
                <span>
                    {day}/{month}
                </span>
                <span>{year}</span>
            </div>
            <div className="sect-2">
                <span className="voting-subject__name">{subjectName}</span>
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
