import { firestore } from 'config/firebase';
import { doc, getDoc } from 'firebase/firestore';

/**
 * `getSubjectDetails` - get subject details from firestore
 * @param {string} subjectId  Subject ID from either url using `useParam()` hook or from subject details object
 * @return  subject details from firestore
 */

const getSubjectDetails = async (subjectId: string) => {
    const subjectRef = doc(firestore, 'subjects', subjectId);
    const subjectSnap = await getDoc(subjectRef);

    if (!subjectSnap.exists()) {
        return {};
    }
    return subjectSnap.data();
};

export default getSubjectDetails;
