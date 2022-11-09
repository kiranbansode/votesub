import { firestore } from 'config/firebase';
import { doc, getDoc } from 'firebase/firestore';

/**
 * `getSingleCandidateDetails` will return details object candidate from firestore
 * @param {string} candidateId candidateId from subject's single candidate
 * @return object filled with candidate details
 */
const getSingleCandidateDetails = async (candidateId: string) => {
    const candidateRef = doc(firestore, 'candidates', candidateId);
    const candidateSnap = await getDoc(candidateRef);

    if (!candidateSnap.exists()) {
        return null;
    }
    return candidateSnap.data();
};

export default getSingleCandidateDetails;
