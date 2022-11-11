import { useState, useEffect } from 'react';
import { firestore } from 'config/firebase';

import Separator from 'components/Separator';
import './RemainingVotes.styles.scss';
import { doc, onSnapshot } from 'firebase/firestore';
import ColoredRemainingVotes from 'styled/ColoredRemainingVotes';

interface IRemainingVotes {
    userId: string;
}

const RemainingVotes = ({ userId }: IRemainingVotes) => {
    const [remainingVotes, setRemainingVotes] = useState<number>();
    const unsubscribe = onSnapshot(doc(firestore, 'users', userId), (user) => {
        const userData = user.data();
        setRemainingVotes(() => userData?.remainingVotes);
    });

    // eslint-disable-next-line arrow-body-style
    useEffect(() => {
        return () => unsubscribe();
    });

    return (
        <div className="remaining-votes-container">
            <div>
                <span className="title">Your remaining votes : </span>
                <ColoredRemainingVotes className="counter" remainingVotes={Number(remainingVotes)}>
                    {remainingVotes}
                </ColoredRemainingVotes>
            </div>
            <Separator />
        </div>
    );
};

export default RemainingVotes;
