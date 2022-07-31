// import VoteSubLogo from 'assets/svg/logo.votesub.svg';
import VoteSubLogoDarker from 'assets/svg/logo.votesub.darker.svg';

import './Logo.styles.scss';

const Logo = () => (
    <div className="logo" id="votesub-logo">
        <img alt="votesub-logo" src={VoteSubLogoDarker} />
    </div>
);

export default Logo;
