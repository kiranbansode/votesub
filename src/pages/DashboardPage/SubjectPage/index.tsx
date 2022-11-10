import Header from 'components/Header';
import { useParams } from 'react-router-dom';
import { firestore } from 'config/firebase';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import VotingCandidate from 'components/VotingCandidate';
import Separator from 'components/Separator';
import LoadingScreen from 'components/LoadingScreen';
import convertUnixEpochToDate from 'utils/helperFunctions/convertUnixEpoch';
import getSubjectDetails from 'utils/helperFunctions/getSubjectDetails';
import sortCandidatesByVotes from 'utils/helperFunctions/sortCandidatesByVotes';

import './SubjectPage.styles.scss';

interface ISubject {
    id: string;
    candidates: any[];
    submittedBy: string;
    createdOn: number;
    subjectName: string;
    userName: string;
}

interface ICandidate {
    candidateName: string;
    id: string;
    subjectId: string;
    votes: number;
}

const SubjectPage = () => {
    const [subject, setSubject] = useState<ISubject>();
    const [totalVotes, setTotalVotes] = useState<number>(0);
    const [showView, setShowView] = useState<boolean>(false);
    const [candidates, setCandidates] = useState<ICandidate[]>();

    // Get subject's ID from url
    const { id: subjectId } = useParams();
    const candidatesRef = query(
        collection(firestore, 'candidates'),
        where('subjectId', '==', `${subjectId}`),
    );
    const { day, shortMonth, year, time } = convertUnixEpochToDate(subject?.createdOn!);

    useEffect(() => {
        // Get subject details
        if (!subject?.id) {
            getSubjectDetails(subjectId!)
                // TODO: Look into this later. Types are matching
                // @ts-ignore
                .then((data) => setSubject(data))
                .catch((err) => err);
        }

        /*
          Side-Effects must not be inside any render function. Other it will re-render component.
          That is why onSnapshot listener is inside useEffect
         */

        // Get Realtime Votes
        const unsubscribeToTotalVotes = onSnapshot(candidatesRef, (querySnapshot) => {
            const candidatesVotes: any[] = [];
            const candidatesLiveDetails: any[] = [];
            querySnapshot.forEach((doc) => {
                const candidateData = doc.data();
                candidatesVotes.push(candidateData.votes);
                candidatesLiveDetails.push(candidateData);
            });

            // @ts-ignore
            const sort = sortCandidatesByVotes(candidatesLiveDetails);
            setCandidates(sort);
            setTotalVotes(candidatesVotes.reduce((a, b) => a + b));

            if (showView === false) {
                setShowView(true);
            }
        });

        // Remove Listener to stop realtime vote updates
        return () => {
            unsubscribeToTotalVotes();
        };
    }, [subject?.id]);

    return !showView ? (
        <LoadingScreen />
    ) : (
        <div className="subject-page-container">
            <Header />
            <div className="page-content">
                <h1 className="title">{subject?.subjectName}</h1>
                <Separator />
                <div className="about-container">
                    <p className="submitter">By : {subject?.submittedBy}</p>
                    <p className="creation-date">
                        Submitted On : {`${day} ${shortMonth} ${year} at ${time}`}
                    </p>
                    <p className="total-votes">
                        Total Votes
                        <span className="votes-counter">{totalVotes}</span>
                    </p>
                </div>

                <div className="candidates-container">
                    {candidates?.map((candidate, idx) => (
                        <VotingCandidate
                            candidateName={candidate.candidateName}
                            id={candidate.id}
                            key={candidate.id}
                            position={totalVotes > 0 ? idx + 1 : 0}
                            showColored={candidates.length > 3 && totalVotes > 0}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubjectPage;
