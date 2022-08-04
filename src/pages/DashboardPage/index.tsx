import Header from 'components/Header';
import Separator from 'components/Separator';
import Candidate from 'components/Candidate';

import './Dashboard.styles.scss';
import SideBar from 'components/SideBar';

const DashboardPage = () => (
    <div id="dashboard-page">
        <Header />

        <SideBar />
        <p id="remainig-votes">
            Your Remaining Votes : <span>100</span>
        </p>
        <Separator />

        <p className="voting-topic"> -x- Most Favourite Subject -x-</p>

        <div id="candidate-list">
            <Candidate candidateName="Geography" position={1} totalVotes={1995} />

            <Candidate candidateName="History" position={2} totalVotes={1994} />

            <Candidate candidateName="Mathematics" position={3} totalVotes={1993} />

            <Candidate candidateName="English" position={4} totalVotes={1992} />

            <Candidate candidateName="Science" position={5} totalVotes={1991} />
        </div>
    </div>
);

export default DashboardPage;
