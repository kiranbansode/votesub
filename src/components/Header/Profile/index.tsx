/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import './Profile.styles.scss';
import { SIGNOUT_USER_AND_RESET_AUTH_DETAILS } from 'store/loginPage/userLoginSlice';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

const menuList = [
    {
        icon: <AccountBoxIcon />,
        id: nanoid(),
        menu: 'Profile',
        onClickFn: () => {},
    },
    {
        icon: <SettingsIcon />,
        id: nanoid(),
        menu: 'Settings',
        onClickFn: () => {},
    },
    {
        icon: <PowerSettingsNewIcon />,
        id: nanoid(),
        menu: 'Log Out',
        onClickFn: SIGNOUT_USER_AND_RESET_AUTH_DETAILS,
    },
];

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
                id="menu-appbar"
                open={Boolean(showProfileMenu)}
                sx={{ mt: '45px' }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={closeProfileMenuHandler}
            >
                {menuList.map(({ menu, id, icon, onClickFn }) => (
                    // TODO: Instead using loop to display menu, create individual list item by hard coding them. It's getting harder to add more functionality

                    <MenuItem key={id} onClick={closeProfileMenuHandler}>
                        {/* TODO: move inline styles to Profile.styles.scss */}
                        <p
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                margin: '0',
                            }}
                            // @ts-ignore
                            onClick={() => dispatch(onClickFn())}
                        >
                            {icon}
                            <span
                                style={{
                                    marginLeft: '10px',
                                }}
                            >
                                {menu}
                            </span>
                        </p>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default ProfileMenu;
