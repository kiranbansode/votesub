/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useNavigate, useLocation } from 'react-router-dom';
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
import { HIDE_SIDEBAR } from 'store/ui';

import './SideBar.styles.scss';
import saveLastVisitedRoute from 'utils/helperFunctions/saveLastVisitedRoute';
import { useEffect } from 'react';

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
        link: '/addNewSubject',
        linkIcon: <AddIcon />,
        linkName: 'Add New Subject',
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
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const closeSideBar = (e: any) => {
        const { localName } = e.target as Element;
        if (localName === 'svg' || localName === 'path') {
            dispatch(HIDE_SIDEBAR());
            return;
        }

        const isNavLink = (e.target as Element).className.split(' ').includes('nav-links');
        const isNavLinkContainer = (e.target as Element).className === 'nav-link__container';

        if (isNavLink || isNavLinkContainer) return;

        dispatch(HIDE_SIDEBAR());
    };

    useEffect(() => {
        saveLastVisitedRoute(pathname);
    }, [pathname]);

    return (
        <div className="animate__animated" id="sidebar" onClick={(e) => closeSideBar(e)}>
            <ul className="animate__animated animate__slideInLeft nav-links">
                {linksToPages.map((page) => (
                    <li className="nav-link__container" key={page.id}>
                        <div
                            className="nav-link"
                            onClick={(e) => {
                                setTimeout(() => navigate(page.link), 300);
                                closeSideBar(e);
                            }}
                        >
                            {page.linkIcon}
                            <span>{page.linkName}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideBar;
