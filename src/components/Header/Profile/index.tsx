/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from 'config/firebase';
import { signOut } from 'firebase/auth';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import './Profile.styles.scss';
import { SIGNOUT_USER_AND_RESET_AUTH_DETAILS } from 'store/loginPage/userLoginSlice';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { RESET_EXISTING_USER_AUTH_DETAILS } from 'store/existingUserAuthStateSlice/existingUserAuthStateSlice';

const ProfileMenu = () => {
    const [showProfileMenu, setShowProfileMenu] = useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const globalState = useAppSelector((state) => state);

    const openProfileMenuHandler = (e: MouseEvent<HTMLElement>) =>
        setShowProfileMenu(e.currentTarget);

    const closeProfileMenuHandler = () => setShowProfileMenu(null);

    useEffect(() => {
        if (!globalState.user.userDetails.uid) {
            setTimeout(() => navigate('/'), 2000);
        }
    }, [globalState.user.userDetails.uid]);

    return (
        <div id="header-profile">
            <Tooltip title="Open Profile Menu">
                <IconButton sx={{ p: 0 }} onClick={openProfileMenuHandler}>
                    <PersonIcon className="header-icons" />
                </IconButton>
            </Tooltip>
            <Menu
                keepMounted
                anchorEl={showProfileMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(showProfileMenu)}
                sx={{ mt: '45px' }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={closeProfileMenuHandler}
            >
                <MenuItem>
                    <p onClick={() => navigate('/profile')}>
                        <span className="profile-menu-icon">
                            <AccountBoxIcon />
                        </span>
                        <span className="profile-menu-name">Profile</span>
                    </p>
                </MenuItem>
                <MenuItem>
                    <p onClick={() => navigate('/settings')}>
                        <span className="profile-menu-icon">
                            <SettingsIcon />
                        </span>
                        <span className="profile-menu-name">Settings</span>
                    </p>
                </MenuItem>
                <MenuItem>
                    <p
                        onClick={() => {
                            signOut(auth)
                                .then(() => {
                                    dispatch(RESET_EXISTING_USER_AUTH_DETAILS());
                                    dispatch(SIGNOUT_USER_AND_RESET_AUTH_DETAILS());
                                })
                                .catch((error) => error);
                        }}
                    >
                        <span className="profile-menu-icon">
                            <PowerSettingsNewIcon />
                        </span>
                        <span className="profile-menu-name">Log Out</span>
                    </p>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default ProfileMenu;
