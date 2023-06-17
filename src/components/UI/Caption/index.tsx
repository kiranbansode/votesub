import VoteSubCaption from 'assets/svg/caption.votesub.svg';

import './Caption.styles.scss';

const Caption = () => (
    <div className="votesub-caption-container">
        <img
            alt="votesub-caption"
            className="votesub-caption"
            loading="lazy"
            src={VoteSubCaption}
        />
    </div>
);

export default Caption;
