import { doc, onSnapshot } from 'firebase/firestore';
import { firestore, auth } from 'config/firebase';
import { useEffect, useState } from 'react';

const useUserRemainingVotes = () => {
    const [remainingVotes, setRemainingVotes] = useState<number | null>(null);
    const userId = auth.currentUser?.uid;

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
