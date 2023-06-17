import { useState, useEffect } from 'react';
import { firestore } from 'config/firebase';
import { getDocs, collection } from 'firebase/firestore';

const useGetGrandTotalVotes = () => {
    const [grandTotalVotes, setGrandTotalVotes] = useState<number>(0);
    const usersRef = collection(firestore, 'candidates');

    useEffect(() => {
        (async () => {
            const rawGrandTotalVotes: number[] = [];
            const rawUsersDetails = await getDocs(usersRef);

            rawUsersDetails.forEach((user) => {
                rawGrandTotalVotes.push(user.data().votes);
            });

            const totalVotes = rawGrandTotalVotes.reduce((acc, currVote) => acc + currVote, 0);

            setGrandTotalVotes(totalVotes);
        })();
    }, []);

    return grandTotalVotes;
};

export default useGetGrandTotalVotes;
