import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { firestore, auth } from 'config/firebase';
import { useEffect, useState } from 'react';

const useUserRemainingVotes = () => {
    const [remainingVotes, setRemainingVotes] = useState<number>(0);
    const userId = auth.currentUser?.uid;
    const userRef = doc(firestore, 'users', userId!);

    if (remainingVotes < 0) {
        // sometimes due to latency user's remaining votes goes below 0
        // if that happen, this will update user's remaining votes back to 0
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
