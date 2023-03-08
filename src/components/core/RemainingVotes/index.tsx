import { useEffect, useState } from 'react';
import Separator from 'components/UI/Separator';
import ColoredRemainingVotes from 'styled/ColoredRemainingVotes';
import LoadingScreen from 'components/UI/LoadingScreen';
import useUserRemainingVotes from 'hooks/useUserRemainingVotes';

import './RemainingVotes.styles.scss';
import ErrorView from 'components/UI/ErrorView';
import convertZeroTimeToLocale from 'utils/helperFunctions/convertZeroTimeToLocale';

interface IRemainingVotes {
    showImmediately?: boolean;
}

const RemainingVotes = ({ showImmediately = false }: IRemainingVotes) => {
    const [showView, setShowView] = useState(false);
    const [remainingVotes] = useUserRemainingVotes();

    useEffect(() => {
        let clearShowViewTimeout: any;
        if (remainingVotes || remainingVotes === 0) {
            clearShowViewTimeout = setTimeout(
                () => {
                    setShowView(true);
                },
                showImmediately ? 0 : 700,
            );
        }
        return () => clearTimeout(clearShowViewTimeout);
    }, [remainingVotes]);

    return showView ? (
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

            <Separator />

            {remainingVotes === 0 ? (
                <ErrorView
                    errorTitle="No Votes Left"
                    mssg={`Don't worry! It will be refilled again at ${convertZeroTimeToLocale()}`}
                />
            ) : null}
        </div>
    ) : (
        <LoadingScreen className="remaining-votes__loading" />
    );
};

export default RemainingVotes;
