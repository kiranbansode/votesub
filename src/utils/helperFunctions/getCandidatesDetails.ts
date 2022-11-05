import { firestore } from 'config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const getCandidatesDetails = (candidates: any[]) =>
    Promise.all(
        candidates.map(async (candidate) => {
            const candidateRef = doc(firestore, 'candidates', candidate);
            const docSnap = await getDoc(candidateRef);
            if (!docSnap.exists()) {
                return null;
            }
            return docSnap.data();
        }),
    );

export default getCandidatesDetails;
