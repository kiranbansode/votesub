import Header from 'components/Header';
import { useParams } from 'react-router-dom';
import useAppSelector from 'hooks/useAppSelector';
import getSubjectDetailsFromList from 'utils/helperFunctions/getSubjectDetailsFromList';
import { getTotalVotesCLF } from 'config/firebase';
import { useEffect, useState } from 'react';
import getCandidatesDetails from 'utils/helperFunctions/getCandidatesDetails';
import VotingCandidate from 'components/VotingCandidate';
import Separator from 'components/Separator';

import './SubjectPage.styles.scss';
import convertUnixEpochToDate from 'utils/helperFunctions/convertUnixEpoch';

const SubjectPage = () => {
    const { id: subjectId } = useParams();
    const subjectList = useAppSelector(({ subjectsList }) => subjectsList.list);

    const [totalVotes, setTotalVotes] = useState(null);
    const [candidatesDetails, setCandidateDetails] = useState([]);
    const { candidates, subjectName, createdOn, submittedBy } = getSubjectDetailsFromList(
        subjectList,
        subjectId!,
    );
    const { day, shortMonth, year, time } = convertUnixEpochToDate(createdOn);

    useEffect(() => {
        // @ts-ignore
        getTotalVotesCLF(candidates).then(({ data }) => setTotalVotes(data));
        getCandidatesDetails(candidates).then((data) => {
            // @ts-ignore
            setCandidateDetails(data);
        });
    }, []);

    console.log(candidatesDetails);

    return (
        <div className="subject-page-container">
            <Header />
            <div className="page-content">
                <h1 className="title">{subjectName}</h1>
                <Separator />
                <div className="about-container">
                    <p className="submitter">By : {submittedBy}</p>
                    <p className="creation-date">
                        Submitted On : {`${day} ${shortMonth} ${year} at ${time}`}
                    </p>
                    <p className="total-votes">
                        Total Votes
                        <span className="votes-counter">{totalVotes}</span>
                    </p>
                </div>

                <div className="candidates-container">
                    {candidatesDetails.map((candidate) => (
                        <VotingCandidate
                            // @ts-ignore
                            candidateName={candidate.candidateName}
                            // @ts-ignore
                            key={candidate.id}
                            position={0}
                            totalVotes={0}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubjectPage;
