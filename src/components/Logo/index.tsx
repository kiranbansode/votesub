import VoteSubLogo from 'assets/svg/votesub.logo.svg';

import './Logo.styles.scss';

const Logo = () => (
  <div className="logo">
    <img alt="votesub-logo" src={VoteSubLogo} />{' '}
  </div>
);

export default Logo;
