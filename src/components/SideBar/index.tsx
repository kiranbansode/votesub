/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import CloseIcon from '@mui/icons-material/Close';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import useAppDispatch from 'hooks/useAppDispatch';
import { HIDE_SIDEBAR } from 'store/globalUIState';

import './SideBar.styles.scss';

const linksToPages = [
    { link: '', linkIcon: <CloseIcon />, linkName: '' },
    { link: '/dashboard', linkIcon: <DashboardIcon />, linkName: 'Dashboard' },
    { link: '/addNewTopic', linkIcon: <AddIcon />, linkName: 'Add New Topic' },
    { link: '/userVotingHistory', linkIcon: <HistoryIcon />, linkName: 'Voting History' },
    { link: '/adminPanel', linkIcon: <AdminPanelSettingsIcon />, linkName: 'Admin' },
    { link: '/settings', linkIcon: <SettingsIcon />, linkName: 'Settings' },
];

const SideBar = () => {
    const dispatch = useAppDispatch();
    return (
        <div id="sidebar">
            <ul>
                {linksToPages.map((page) => (
                    <>
                        <li key={page.link} onClick={() => dispatch(HIDE_SIDEBAR())}>
                            <Link to={page.link}>
                                {page.linkIcon}
                                <span>{page.linkName}</span>
                            </Link>
                        </li>
                    </>
                ))}
            </ul>
        </div>
    );
};

export default SideBar;
