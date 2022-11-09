import Header from 'components/Header';
import { useParams } from 'react-router-dom';
import { firestore } from 'config/firebase';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import getCandidatesDetails from 'utils/helperFunctions/getCandidatesDetails';
import VotingCandidate from 'components/VotingCandidate';
import Separator from 'components/Separator';
import LoadingScreen from 'components/LoadingScreen';
import convertUnixEpochToDate from 'utils/helperFunctions/convertUnixEpoch';
import getSubjectDetails from 'utils/helperFunctions/getSubjectDetails';

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
    const [candidatesDetails, setCandidatesDetails] = useState<ICandidate[]>();
    const [totalVotes, setTotalVotes] = useState<number>(0);
    const [showView, setShowView] = useState<boolean>(false);

    // Get subject's ID from url
    const { id: subjectId } = useParams();
    const { day, shortMonth, year, time } = convertUnixEpochToDate(subject?.createdOn!);

    // Get Realtime Votes
    const candidatesRef = query(
        collection(firestore, 'candidates'),
        where('subjectId', '==', `${subjectId}`),
    );
    const unsubscribeToTotalVotes = onSnapshot(candidatesRef, (querySnapshot) => {
        const cities: any[] = [];
        querySnapshot.forEach((doc) => {
            cities.push(doc.data().votes);
        });
        setTotalVotes(cities.reduce((a, b) => a + b));
    });

    useEffect(() => {
        // Get subject details
        if (!subject?.id) {
            getSubjectDetails(subjectId!)
                // TODO: Look into this. Types are matching
                // @ts-ignore
                .then((data) => setSubject(data))
                .catch((err) => err);
        }

        // Get Candidates Details
        if (subject?.id) {
            getCandidatesDetails(subject.candidates).then((data: any) => {
                setCandidatesDetails(data);
                /**
                 * Using hardcoded `true` as value for showView.
                 * Because it is very hard to know that how much time useEffect will get invoked ?
                 */
                setShowView(true);
            });
        }

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
                    {candidatesDetails?.map((candidate) => (
                        <VotingCandidate
                            candidateName={candidate.candidateName}
                            id={candidate.id}
                            key={candidate.id}
                            position={0}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubjectPage;
