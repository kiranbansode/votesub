/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import CloseIcon from '@mui/icons-material/Close';
import Separator from 'components/Separator';
import useAppDispatch from 'hooks/useAppDispatch';
import { HIDE_SIDEBAR } from 'store/globalUIState';

import './SideBar.styles.scss';

const SideBar = () => {
    const dispatch = useAppDispatch();
    return (
        <div id="sidebar">
            <ul>
                <span className="close-sidebar-icon" onClick={() => dispatch(HIDE_SIDEBAR())}>
                    <CloseIcon />
                </span>
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
};

export default SideBar;
