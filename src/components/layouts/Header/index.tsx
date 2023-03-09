/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import MenuIcon from '@mui/icons-material/Menu';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import Logo from 'components/UI/Logo';
import SideBar from 'components/layouts/SideBar';
import { SHOW_SIDEBAR, SHOW_SIGN_OUT_SUCCESS_POP_UP, HIDE_SIGN_OUT_SUCCESS_POP_UP } from 'store/ui';
import { RESET_CURRENT_PAGE } from 'store/pagination/pageTracker';
import BackdropMssg from 'components/UI/BackdropMssg';
import ProfileMenu from 'components/layouts/Header/Profile';

import './Header.style.scss';
import { useEffect } from 'react';

const Header = () => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(({ user }) => user.userDetails.uid);
    const shouldShowSignOutPopUp = useAppSelector(({ ui }) => ui.showSignOutSuccessPopUp);

    const ShowSignOutSuccessBackDrop = () => (
        <BackdropMssg
            header="Log Out Successfully"
            mssg="Redirecting to Login Page"
            open={shouldShowSignOutPopUp}
            type="success"
        />
    );

    useEffect(() => {
        if (!userId) {
            dispatch(SHOW_SIGN_OUT_SUCCESS_POP_UP());
        }

        return () => {
            dispatch(HIDE_SIGN_OUT_SUCCESS_POP_UP());
        };
    }, [userId]);

    return (
        <div id="header">
            <SideBar />

            {/* This will be shown on Header Component */}
            <MenuIcon className="header-icons" onClick={() => dispatch(SHOW_SIDEBAR())} />
            <Logo goHere="/dashboard" onClick={() => dispatch(RESET_CURRENT_PAGE())} />
            <ProfileMenu />
            {shouldShowSignOutPopUp ? <ShowSignOutSuccessBackDrop /> : null}
        </div>
    );
};

export default Header;
