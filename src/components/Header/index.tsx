/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import useAppDispatch from 'hooks/useAppDispatch';
import Logo from 'components/Logo';
import SideBar from 'components/SideBar';
import { SHOW_SIDEBAR } from 'store/ui';
import './Header.style.scss';

const Header = () => {
    const dispatch = useAppDispatch();
    return (
        <div id="header">
            <SideBar />
            <div onClick={() => dispatch(SHOW_SIDEBAR())}>
                <MenuIcon className="header-icons" />
            </div>
            <Logo />
            <PersonIcon className="header-icons" />
        </div>
    );
};

export default Header;
