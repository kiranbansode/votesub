/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import VoteSubLogo from 'assets/svg/logo.votesub.svg';
import { useNavigate } from 'react-router-dom';
import VoteSubLogoDarker from 'assets/svg/logo.votesub.darker.svg';

import './Logo.styles.scss';

interface ILogo {
    goHere: string;
    className?: string;
    /**
     * `onClick` method will be attached directly to the `<img/>` element, instead of `<div/>` container
     */
    onClick?: () => void;
}

const Logo = ({ goHere, className, onClick }: ILogo) => {
    const navigate = useNavigate();

    return (
        <div className={`votesub-logo-container ${className}`} onClick={() => navigate(goHere)}>
            <img
                alt="votesub-logo"
                className="votesub-logo"
                src={VoteSubLogoDarker}
                onClick={onClick}
            />
        </div>
    );
};

Logo.defaultProps = {
    className: '',
    onClick: () => {},
};

export default Logo;
