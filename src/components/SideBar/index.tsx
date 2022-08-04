import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import './SideBar.styles.scss';
import Separator from 'components/Separator';

const SideBar = () => (
    <div id="sidebar">
        <ul>
            <Separator />
            <li>
                <Link to="/dashboard">
                    <DashboardIcon />
                    <span> Dashboard</span>
                </Link>
            </li>
            <Separator />
            <li>
                <Link to="/addNewTopic">
                    <AddIcon />
                    <span>Add New Topic</span>
                </Link>
            </li>
            <Separator />
            <li>
                <Link to="/userVotingHistory">
                    <HistoryIcon />
                    <span>Voting History</span>
                </Link>
            </li>
            <Separator />
        </ul>
    </div>
);

export default SideBar;
