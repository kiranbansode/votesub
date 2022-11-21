import { useEffect, useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { voteNowCLF, firestore, reduceVotesCLF, saveToHistoryCLF } from 'config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import './VotingCandidate.styles.scss';
import CandidatePosition from 'styled/CandidatePosition';
import useAppSelector from 'hooks/useAppSelector';

interface ICandidate {
    id: string;
    /**
     * Addition of `index` of candidate and `1`
     * @example
     * index + 1
     */
    position: number;
    candidateName: string;
    /**
     * Depending on the number of candidates and total votes it
     * will show normal position without any distinctive color or
     * position with Gold, Silver and Bronze background color
     */
    showColored: boolean;
    subjectId: string;
}

const VotingCandidate = ({
    position = 0,
    candidateName,
    id,
    showColored,
    subjectId,
}: ICandidate) => {
    const candidateId = id;
    const [votes, setVotes] = useState(null);
    const userId = useAppSelector(({ user }) => user.userDetails.uid);

    useEffect(() => {
        const unsubscribe = userId
            ? onSnapshot(
                  doc(firestore, 'candidates', id),
                  (candidate) => {
                      const data = candidate.data();
                      setVotes(() => data?.votes);
                  },
                  () => {},
              )
            : () => {};

        return () => unsubscribe();
    }, []);

    return (
        <div className="voting-candidate">
            {showColored ? (
                <CandidatePosition position={position}>{position}</CandidatePosition>
            ) : (
                <p className="candidate-position">{position}</p>
            )}

            <p className="candidate-name">
                {candidateName}
                <span className="total-votes">
                    Votes : <span className="actual-votes">{votes}</span>
                </span>
            </p>
            <p className="vote-now">
                <ArrowUpwardIcon
                    className="vote-icon"
                    onClick={() => {
                        voteNowCLF(id);
                        reduceVotesCLF(userId);
                        saveToHistoryCLF({ subjectId, candidateId });
                    }}
                />
                <span className="vote-text">Vote</span>
            </p>
        </div>
    );
};

export default VotingCandidate;
