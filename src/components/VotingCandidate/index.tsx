import { useEffect, useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { voteNowCLF, firestore } from 'config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import './VotingCandidate.styles.scss';

interface ICandidate {
    id: string;
    position: number;
    candidateName: string;
}

const VotingCandidate = ({ position = 0, candidateName, id }: ICandidate) => {
    const [votes, setVotes] = useState(null);
    const unsubscribe = onSnapshot(doc(firestore, 'candidates', id), (candidate) => {
        const data = candidate.data();
        setVotes(() => data?.votes);
    });

    // eslint-disable-next-line arrow-body-style
    useEffect(() => {
        return () => unsubscribe();
    }, []);

    return (
        <div className="voting-candidate">
            <p className="candidate-position">{position}</p>
            <p className="candidate-name">
                {candidateName}
                <span className="total-votes">
                    Votes : <span className="actual-votes">{votes}</span>
                </span>
            </p>
            <p className="vote-now">
                <ArrowUpwardIcon className="vote-icon" onClick={() => voteNowCLF(id)} />
                <span className="vote-text">Vote</span>
            </p>
        </div>
    );
};

export default VotingCandidate;
