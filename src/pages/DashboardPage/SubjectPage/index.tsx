import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSubjectTotalVotes from 'hooks/useSubjectTotalVotes';
import Header from 'components/Header';
import VotingCandidate from 'components/VotingCandidate';
import Separator from 'components/Separator';
import LoadingScreen from 'components/LoadingScreen';
import RemainingVotes from 'components/RemainingVotes';
import convertUnixEpochToDate from 'utils/helperFunctions/convertUnixEpochToDate';
import getSubjectDetails from 'features/getSubjectDetails';

import './SubjectPage.styles.scss';

interface ISubject {
    id: string;
    candidates: any[];
    submittedBy: string;
    createdOn: number;
    subjectName: string;
    userName: string;
}

const SubjectPage = () => {
    const { id: subjectId } = useParams();
    const [subject, setSubject] = useState<ISubject>();
    const [error, setError] = useState<{
        status: number;
        subjectId: string;
    }>();
    const [showView, setShowView] = useState<boolean>(false);
    const { candidates, subjectTotalVotes } = useSubjectTotalVotes(subjectId!);
    const { day, fullMonth, year } = convertUnixEpochToDate(subject?.createdOn!);
    const navigate = useNavigate();

    useEffect(() => {
        // Get subject details

        if (!subject?.id) {
            getSubjectDetails(subjectId!)
                // TODO: Look into this later. Types are matching
                // @ts-ignore
                .then((data) => {
                    if (data.status) {
                        // @ts-ignore
                        setError(data);
                        return;
                    }
                    // @ts-ignore
                    setSubject(data);
                    setTimeout(() => setShowView(true), 1000);
                })
                .catch((err) => err);
        }
    }, [subject?.id]);

    // if requested subject is somehow got deleted or not found user will be navigated to error-page
    useEffect(() => {
        if (error?.status) navigate('/error');
    }, [error?.status]);

    return (
        <div className="subject-page-container">
            <Header />

            {!showView ? (
                <LoadingScreen fullScreen />
            ) : (
                <div className="page-view">
                    <RemainingVotes showImmediately />

                    <h1 className="subject-title">{subject?.subjectName}</h1>
                    <Separator />
                    <div className="about-container">
                        <p className="submitter">Owner : {subject?.submittedBy}</p>
                        <p className="creation-date">
                            Created On : {`${fullMonth} ${day}, ${year}`}
                        </p>
                        <p className="total-votes">
                            <span className="votes-counter">{subjectTotalVotes}</span>
                            <span className="votes-name">Total Votes</span>
                        </p>
                    </div>

                    <div className="candidates-container">
                        <div>
                            <p className="candidates-title">-x- Voting Candidates -x-</p>
                        </div>

                        {candidates?.map((candidate, idx) => (
                            <VotingCandidate
                                candidateName={candidate.candidateName}
                                id={candidate.id}
                                key={candidate.id}
                                position={subjectTotalVotes > 0 ? idx + 1 : 0}
                                showColored={candidates.length > 3 && subjectTotalVotes > 0}
                                subjectId={subjectId!}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubjectPage;
