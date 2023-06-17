/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import Logo from 'components/UI/Logo';
import SideBar from 'components/layouts/SideBar';
import { SHOW_SIDEBAR, HIDE_SIGN_OUT_SUCCESS_POP_UP } from 'store/ui';
import { RESET_CURRENT_PAGE } from 'store/pagination/pageTracker';
import BackdropMssg from 'components/UI/BackdropMssg';
import ProfileMenu from 'components/layouts/Header/Profile';

import './Header.style.scss';

const Header = () => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(({ user }) => user.userDetails.uid);
    const { showSignOutSuccessPopUp } = useAppSelector(({ ui }) => ui);

    const ShowSignOutSuccessBackDrop = () =>
        !userId ? (
            <BackdropMssg
                header="Log Out Successfully"
                mssg="Redirecting to Login Page"
                open={showSignOutSuccessPopUp}
                type="success"
            />
        ) : null;

    useEffect(
        () => () => {
            dispatch(HIDE_SIGN_OUT_SUCCESS_POP_UP());
        },
        [userId],
    );

    return (
        <div id="header">
            <SideBar />

            {/* This will be shown on Header Component */}
            <MenuIcon className="header-icons" onClick={() => dispatch(SHOW_SIDEBAR())} />
            <Logo goHere="/dashboard" onClick={() => dispatch(RESET_CURRENT_PAGE())} />
            <ProfileMenu />
            {!userId ? <ShowSignOutSuccessBackDrop /> : null}
        </div>
    );
};

export default Header;
