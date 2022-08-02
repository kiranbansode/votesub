import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './Candidate.styles.scss';

interface ICandidate {
    position: number;
    totalVotes: number;
    candidateName: string;
}

const Candidate = ({ position, totalVotes, candidateName }: ICandidate) => (
    <div className="voting-candidate">
        <p className="candidate-position">{position}</p>
        <p className="candidate-name">
            {candidateName}
            <span className="total-votes">Votes : {totalVotes}</span>
        </p>
        <p className="vote-now">
            <ArrowUpwardIcon className="vote-icon" />
            <span className="vote-text">Vote</span>
        </p>
    </div>
);

export default Candidate;
