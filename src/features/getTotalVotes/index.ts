import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from 'config/firebase';

const getTotalVotes = async (subjectId: string) => {
    const candidates = query(
        collection(firestore, 'candidates'),
        where('subjectId', '==', subjectId),
    );
    const candidatesSnapShot = await getDocs(candidates);
    const totalVotes: number[] = [];

    candidatesSnapShot.forEach((candidate) => {
        const candidateDetails = candidate.data();
        totalVotes.push(candidateDetails?.votes || 0);
    });

    return totalVotes.reduce((prevVal, currVal) => prevVal + currVal);
};

export default getTotalVotes;
