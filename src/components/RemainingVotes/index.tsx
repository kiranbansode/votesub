import Separator from 'components/Separator';
import ColoredRemainingVotes from 'styled/ColoredRemainingVotes';
import LoadingScreen from 'components/LoadingScreen';
import useUserRemainingVotes from 'hooks/useUserRemainingVotes';

import './RemainingVotes.styles.scss';

const RemainingVotes = () => {
    const [remainingVotes] = useUserRemainingVotes();

    return remainingVotes || remainingVotes === 0 ? (
        <div className="remaining-votes-container">
            <div>
                <span className="remaining-votes__title">Your remaining votes : </span>
                <ColoredRemainingVotes
                    className="remaining-votes__counter"
                    remainingVotes={Number(remainingVotes)}
                >
                    {remainingVotes}
                </ColoredRemainingVotes>
            </div>

            {remainingVotes === 0 ? (
                <p className="warning">
                    No votes left. So you can&#39;t vote now. It will be refilled again.
                </p>
            ) : null}

            <Separator />
        </div>
    ) : (
        <LoadingScreen className="remaining-votes__loading" size={25} />
    );
};

export default RemainingVotes;
