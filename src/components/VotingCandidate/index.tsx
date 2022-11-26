import { useEffect, useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import { voteNowCLF, firestore, reduceVotesCLF, saveToHistoryCLF } from 'config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import CandidatePosition from 'styled/CandidatePosition';
import useAppSelector from 'hooks/useAppSelector';
import './VotingCandidate.styles.scss';

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
    const [remainingVotes, setRemainingVotes] = useState<number>();

    const userId = useAppSelector(({ user }) => user.userDetails.uid);

    useEffect(() => {
        const unsubscribeCandidate = userId
            ? onSnapshot(
                  doc(firestore, 'candidates', id),
                  (candidate) => {
                      const data = candidate.data();
                      setVotes(() => data?.votes);
                  },
                  () => {},
              )
            : () => {};

        const unsubscribeUser = userId
            ? onSnapshot(
                  doc(firestore, 'users', userId),
                  (user) => {
                      const userData = user.data();
                      setRemainingVotes(() => userData?.remainingVotes);
                  },
                  () => {},
              )
            : () => {};

        return () => {
            unsubscribeCandidate();
            unsubscribeUser();
        };
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
                {remainingVotes === 0 ? (
                    <CloseIcon className="close-icon" />
                ) : (
                    <ArrowUpwardIcon
                        className="vote-icon"
                        onClick={() => {
                            if (remainingVotes === 0) {
                                return;
                            }

                            voteNowCLF(id);
                            reduceVotesCLF(userId);
                            saveToHistoryCLF({ subjectId, candidateId });
                        }}
                    />
                )}

                <span className="vote-text">
                    {remainingVotes === 0 ? 'No Votes Left' : 'Vote Now'}
                </span>
            </p>
        </div>
    );
};

export default VotingCandidate;
