import { useState, MouseEvent } from 'react';
import { nanoid } from 'nanoid';
import { IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import './Profile.styles.scss';

const menuList = [
    {
        icon: <AccountBoxIcon />,
        id: nanoid(),
        menu: 'Profile',
    },
    {
        icon: <SettingsIcon />,
        id: nanoid(),
        menu: 'Settings',
    },
    {
        icon: <PowerSettingsNewIcon />,
        id: nanoid(),
        menu: 'Log Out',
    },
];

const ProfileMenu = () => {
    const [showProfileMenu, setShowProfileMenu] = useState<null | HTMLElement>(null);

    const openProfileMenuHandler = (e: MouseEvent<HTMLElement>) =>
        setShowProfileMenu(e.currentTarget);
    const closeProfileMenuHandler = () => setShowProfileMenu(null);

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
                {menuList.map(({ menu, id, icon }) => (
                    <MenuItem key={id} onClick={closeProfileMenuHandler}>
                        {/* TODO: move inline styles to Profile.styles.scss */}
                        <p
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                margin: '0',
                            }}
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
