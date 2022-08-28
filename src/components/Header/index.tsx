/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import MenuIcon from '@mui/icons-material/Menu';
import useAppDispatch from 'hooks/useAppDispatch';
import Logo from 'components/Logo';
import SideBar from 'components/SideBar';
import { SHOW_SIDEBAR } from 'store/ui';
import ProfileMenu from './Profile';
import './Header.style.scss';

const Header = () => {
    const dispatch = useAppDispatch();

    return (
        <div id="header">
            <SideBar />
            <div onClick={() => dispatch(SHOW_SIDEBAR())}>
                <MenuIcon className="header-icons" />
            </div>
            <Logo goHere="/dashboard" />
            <ProfileMenu />
        </div>
    );
};

export default Header;
