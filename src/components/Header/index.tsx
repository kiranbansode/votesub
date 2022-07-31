import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import Logo from 'components/Logo';
import './Header.style.scss';

const Header = () => (
    <div id="header">
        <MenuIcon className="header-icons" />
        <Logo />
        <PersonIcon className="header-icons" />
    </div>
);

export default Header;
