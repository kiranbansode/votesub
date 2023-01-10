import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import CandidatePosition from 'styled/CandidatePosition';
import getLocaleDate from 'utils/helperFunctions/getLocaleDate';
import voteNow from 'features/voteNow';
import useCandidateVotes from 'hooks/useCandidateVotes';
import useUserRemainingVotes from 'hooks/useUserRemainingVotes';
import saveToHistory from 'features/saveToHistory';

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
    const [votes] = useCandidateVotes(id);
    const [remainingVotes] = useUserRemainingVotes();

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
                {remainingVotes! < 0 || remainingVotes === 0 ? (
                    <CloseIcon className="close-icon" />
                ) : (
                    <ArrowUpwardIcon
                        className="vote-icon"
                        onClick={() => {
                            if (remainingVotes === 0) {
                                return;
                            }

                            // voteNowCLF(id);
                            voteNow(id);
                            // saveToHistoryCLF({
                            //     subjectId,
                            //     candidateId,
                            //     localeDate: getLocaleDate(),
                            // });
                            saveToHistory({
                                subjectId,
                                candidateId,
                                localeDate: getLocaleDate(),
                            });
                        }}
                    />
                )}

                <span className="vote-text">
                    {remainingVotes! < 0 || remainingVotes === 0 ? 'No Votes Left' : 'Vote Now'}
                </span>
            </p>
        </div>
    );
};

export default VotingCandidate;
