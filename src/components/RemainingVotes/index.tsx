import { useState, useEffect } from 'react';
import { firestore } from 'config/firebase';

import Separator from 'components/Separator';
import './RemainingVotes.styles.scss';
import { doc, onSnapshot } from 'firebase/firestore';
import ColoredRemainingVotes from 'styled/ColoredRemainingVotes';
import LoadingScreen from 'components/LoadingScreen';

interface IRemainingVotes {
    userId: string;
}

const RemainingVotes = ({ userId }: IRemainingVotes) => {
    const [remainingVotes, setRemainingVotes] = useState<number>();

    // eslint-disable-next-line arrow-body-style
    useEffect(() => {
        const unsubscribe = userId
            ? onSnapshot(
                  doc(firestore, 'users', userId),
                  (user) => {
                      const userData = user.data();
                      setRemainingVotes(() => userData?.remainingVotes);
                  },
                  () => {},
              )
            : () => {};

        return () => {
            unsubscribe();
        };
    });

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
            <Separator />
        </div>
    ) : (
        <LoadingScreen />
    );
};

export default RemainingVotes;
