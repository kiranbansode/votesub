import Header from 'components/Header';
import Separator from 'components/Separator';
import VotingCandidate from 'components/VotingCandidate';

import './Dashboard.styles.scss';

const DashboardPage = () => (
    <div id="dashboard-page">
        <Header />

        <p id="remainig-votes">
            Your Remaining Votes : <span>100</span>
        </p>
        <Separator />

        <p className="voting-topic"> -x- Most Favourite Subject -x-</p>

        <div id="candidate-list">
            <VotingCandidate candidateName="Geography" position={1} totalVotes={1995} />

            <VotingCandidate candidateName="History" position={2} totalVotes={1994} />

            <VotingCandidate candidateName="Mathematics" position={3} totalVotes={1993} />

            <VotingCandidate candidateName="English" position={4} totalVotes={1992} />

            <VotingCandidate candidateName="Science" position={5} totalVotes={1991} />
        </div>
    </div>
);

export default DashboardPage;
