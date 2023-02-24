import { firestore } from 'config/firebase';
import { DocumentReference, doc, getDoc } from 'firebase/firestore';

type TCandidateGetFirestore = {
    id: string;
    candidateName: string;
    subjectID: string;
    votes: number;
};

const getCandidatesDetails = (candidates: string[]) =>
    Promise.all(
        candidates.map(async (candidate) => {
            const candidateRef = doc(
                firestore,
                'candidates',
                candidate,
            ) as DocumentReference<TCandidateGetFirestore>;
            const docSnap = await getDoc(candidateRef);
            if (!docSnap.exists()) {
                return null;
            }
            return docSnap.data();
        }),
    );

export default getCandidatesDetails;
