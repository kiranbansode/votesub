import Header from 'components/Header';
import Separator from 'components/Separator';

import './Dashboard.styles.scss';

const DashboardPage = () => (
    <div id="dashboard-page">
        <Header />
        <p id="remainig-votes">
            Your Remaining Votes : <span>100</span>
        </p>
        <Separator />
    </div>
);

export default DashboardPage;
