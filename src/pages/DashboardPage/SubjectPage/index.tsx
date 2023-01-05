import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSubjectTotalVotes from 'hooks/useSubjectTotalVotes';
import PageNotFound from 'pages/PageNotFound';
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
    const [error, setError] = useState();
    const [showView, setShowView] = useState<boolean>(false);
    const { candidates, subjectTotalVotes } = useSubjectTotalVotes(subjectId!);
    const { day, shortMonth, year } = convertUnixEpochToDate(subject?.createdOn!);

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
                    setShowView(true);
                })
                .catch((err) => err);
        }
    }, [subject?.id]);

    // eslint-disable-next-line no-nested-ternary
    return !showView ? (
        <LoadingScreen />
    ) : // @ts-ignore
    error?.status ? (
        <PageNotFound mssg="Looks like the Subject you're looking for is not found or may be it got deleted." />
    ) : (
        <div className="subject-page-container">
            <Header />
            <div className="page-view">
                <RemainingVotes />

                <h1 className="subject-title">{subject?.subjectName}</h1>
                <Separator />
                <div className="about-container">
                    <p className="submitter">By : {subject?.submittedBy}</p>
                    <p className="creation-date">Submitted On : {`${day} ${shortMonth} ${year}`}</p>
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
        </div>
    );
};

export default SubjectPage;
