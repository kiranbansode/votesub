import { doc, onSnapshot } from 'firebase/firestore';
import { firestore } from 'config/firebase';
import { useEffect, useState } from 'react';

const useCandidateVotes = (candidateId: string) => {
    const [votes, setVotes] = useState(0);

    useEffect(() => {
        const closeLiveConnection = onSnapshot(
            doc(firestore, 'candidates', candidateId),
            (candidate) => {
                const data = candidate.data();
                setVotes(() => data?.votes);
            },
            () => {},
        );

        return () => closeLiveConnection();
    }, []);

    return [votes];
};

export default useCandidateVotes;
