import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from 'config/firebase';
import { useEffect, useState } from 'react';
import sortCandidatesByVotes from 'utils/helperFunctions/sortCandidatesByVotes';

interface ICandidate {
    candidateName: string;
    id: string;
    subjectId: string;
    votes: number;
}

const useSubjectTotalVotes = (subjectId: string) => {
    const [subjectTotalVotes, setSubjectTotalVotes] = useState<number>(0);
    const [candidates, setCandidates] = useState<ICandidate[]>();

    const candidatesRef = query(
        collection(firestore, 'candidates'),
        where('subjectId', '==', `${subjectId}`),
    );

    useEffect(() => {
        const closeLiveConnection = onSnapshot(
            candidatesRef,
            (querySnapshot) => {
                const candidatesVotes: number[] = [];
                const candidatesLiveDetails: any[] = [];
                querySnapshot.forEach((doc) => {
                    const candidateData = doc.data();
                    candidatesVotes.push(candidateData.votes);
                    candidatesLiveDetails.push(candidateData);
                });

                // @ts-ignore
                const sort = sortCandidatesByVotes(candidatesLiveDetails);
                setCandidates(sort);
                if (candidatesVotes.length > 0) {
                    setSubjectTotalVotes(candidatesVotes.reduce((a, b) => a + b));
                }
            },
            () => {},
        );

        return () => closeLiveConnection();
    }, []);

    return { subjectTotalVotes, candidates };
};

export default useSubjectTotalVotes;
