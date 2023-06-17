import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { firestore, auth } from 'config/firebase';
import { useEffect, useState } from 'react';
import { store } from 'store';

const useUserRemainingVotes = () => {
    const [remainingVotes, setRemainingVotes] = useState<number | null>(null);
    const userIdFromStore = store.getState().user.userDetails.uid;
    const userId = auth.currentUser?.uid! || userIdFromStore;
    const userRef = userId && doc(firestore, 'users', userId!);

    if (Number(remainingVotes) < 0) {
        // sometimes due to latency user's remaining votes goes below 0
        // if that happen, this will update user's remaining votes back to 0
        if (userRef)
            updateDoc(userRef, {
                remainingVotes: 0,
            });
    }

    useEffect(() => {
        const closeLiveConnection = onSnapshot(
            doc(firestore, 'users', userId!),
            (user) => {
                const userData = user.data();
                setRemainingVotes(() => userData?.remainingVotes);
            },
            () => {},
        );

        return () => closeLiveConnection();
    }, []);

    return [remainingVotes];
};

export default useUserRemainingVotes;
