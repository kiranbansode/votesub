import VoteSubLogo from 'assets/svg/logo.votesub.svg';

import './Logo.styles.scss';

const Logo = () => (
  <div className="logo">
    <img alt="votesub-logo" src={VoteSubLogo} />
  </div>
);

export default Logo;
