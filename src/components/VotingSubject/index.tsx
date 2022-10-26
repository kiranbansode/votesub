import './VotingSubject.styles.scss';

// eslint-disable-next-line arrow-body-style
const VotingSubject = () => {
    return (
        <div className="voting-subject-container">
            <div className="sect-1">
                <span>31/12</span>
                <span>2022</span>
            </div>
            <div className="sect-2">
                <span>Who came first ? </span>
                <span>By: Chicken and Egg</span>
            </div>
            <div className="sect-3">
                <span>198</span>
                <span>Total Votes</span>
            </div>
        </div>
    );
};

export default VotingSubject;
