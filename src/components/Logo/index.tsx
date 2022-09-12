/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import VoteSubLogo from 'assets/svg/logo.votesub.svg';
import { useNavigate } from 'react-router-dom';
import VoteSubLogoDarker from 'assets/svg/logo.votesub.darker.svg';

import './Logo.styles.scss';

interface ILogo {
    goHere: string;
}

const Logo = ({ goHere }: ILogo) => {
    const navigate = useNavigate();

    return (
        <div className="votesub-logo-container" onClick={() => navigate(goHere)}>
            <img alt="votesub-logo" className="votesub-logo" src={VoteSubLogoDarker} />
        </div>
    );
};

export default Logo;
