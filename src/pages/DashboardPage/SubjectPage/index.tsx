import Header from 'components/Header';
import { useParams } from 'react-router-dom';
import { firestore } from 'config/firebase';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import VotingCandidate from 'components/VotingCandidate';
import Separator from 'components/Separator';
import LoadingScreen from 'components/LoadingScreen';
import convertUnixEpochToDate from 'utils/helperFunctions/convertUnixEpochToDate';
import getSubjectDetails from 'utils/helperFunctions/getSubjectDetails';
import sortCandidatesByVotes from 'utils/helperFunctions/sortCandidatesByVotes';

import './SubjectPage.styles.scss';
import RemainingVotes from 'components/RemainingVotes';
import useAppSelector from 'hooks/useAppSelector';
import PageNotFound from 'pages/PageNotFound';

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
    const [error, setError] = useState();
    const [totalVotes, setTotalVotes] = useState<number>(0);
    const [showView, setShowView] = useState<boolean>(false);
    const [candidates, setCandidates] = useState<ICandidate[]>();
    const userId = useAppSelector(({ user }) => user.userDetails.uid);

    // Get subject's ID from url
    const { id: subjectId } = useParams();
    const candidatesRef = query(
        collection(firestore, 'candidates'),
        where('subjectId', '==', `${subjectId}`),
    );
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
                })
                .catch((err) => err);
        }

        /*
          Side-Effects must not be inside any render function. Other it will re-render component.
          That is why onSnapshot listener is inside useEffect
         */

        // Get Realtime Votes
        const unsubscribeToTotalVotes = subjectId
            ? onSnapshot(
                  candidatesRef,
                  (querySnapshot) => {
                      const candidatesVotes: number[] = [];
                      const candidatesLiveDetails: any[] = [];
                      querySnapshot.forEach((doc) => {
                          const candidateData = doc.data();
                          candidatesVotes.push(candidateData.votes);
                          candidatesLiveDetails.push(candidateData);
                      });

                      // @ts-ignore
                      const sort = sortCandidatesByVotes(candidatesLiveDetails);
                      setCandidates(sort);
                      if (candidatesVotes.length > 0) {
                          setTotalVotes(candidatesVotes.reduce((a, b) => a + b));
                      }

                      if (showView === false) {
                          setShowView(true);
                      }
                  },
                  () => {},
              )
            : () => {};

        // Remove Listener to stop realtime vote updates
        return () => {
            unsubscribeToTotalVotes();
        };
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
                <RemainingVotes userId={userId} />

                <h1 className="subject-title">{subject?.subjectName}</h1>
                <Separator />
                <div className="about-container">
                    <p className="submitter">By : {subject?.submittedBy}</p>
                    <p className="creation-date">Submitted On : {`${day} ${shortMonth} ${year}`}</p>
                    <p className="total-votes">
                        <span className="votes-counter">{totalVotes}</span>
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
                            position={totalVotes > 0 ? idx + 1 : 0}
                            showColored={candidates.length > 3 && totalVotes > 0}
                            subjectId={subjectId!}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubjectPage;
