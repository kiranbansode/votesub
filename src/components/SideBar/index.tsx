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
import FeedbackIcon from '@mui/icons-material/Feedback';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InfoIcon from '@mui/icons-material/Info';
import useAppDispatch from 'hooks/useAppDispatch';
import { HIDE_SIDEBAR } from 'store/globalUIState';

import './SideBar.styles.scss';

const linksToPages = [
    {
        id: '48c9a95c-b1e5-4af1-9de6-2ad520e1b1fc',
        link: '',
        linkIcon: <CloseIcon />,
        linkName: '',
    },
    {
        id: 'bc0b9b75-1be2-4f57-8fb4-725f5a642096',
        link: '/dashboard',
        linkIcon: <DashboardIcon />,
        linkName: 'Dashboard',
    },
    {
        id: 'fd7d742d-e617-447e-b080-97b975aab9da',
        link: '/addNewTopic',
        linkIcon: <AddIcon />,
        linkName: 'Add New Topic',
    },
    {
        id: 'b42035a2-172e-4b50-9180-c3bb85e36e1f',
        link: '/userVotingHistory',
        linkIcon: <HistoryIcon />,
        linkName: 'Voting History',
    },
    {
        id: '6928fa2d-8dd4-4711-b4b2-9d3b5b89cb3e',
        link: '/feedback',
        linkIcon: <FeedbackIcon />,
        linkName: 'Feedback',
    },
    {
        id: '42665dde-68cd-4f43-8a11-28954eea1216',
        link: '/credits',
        linkIcon: <EmojiEmotionsIcon />,
        linkName: 'Credits',
    },
    {
        id: 'f9763186-7b55-4b44-9aaf-9784336de1a8',
        link: '/aboutMe',
        linkIcon: <InfoIcon />,
        linkName: 'About Me',
    },
    {
        id: 'eae654af-dfae-43e7-a052-d05ad4c75b41',
        link: '/adminPanel',
        linkIcon: <AdminPanelSettingsIcon />,
        linkName: 'Admin',
    },
    {
        id: '5c53b010-28b8-4b47-b2a1-74e2854d1a73',
        link: '/settings',
        linkIcon: <SettingsIcon />,
        linkName: 'Settings',
    },
];

const SideBar = () => {
    const dispatch = useAppDispatch();
    return (
        <div id="sidebar">
            <ul>
                {linksToPages.map((page) => (
                    <>
                        <li key={page.id} onClick={() => dispatch(HIDE_SIDEBAR())}>
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
