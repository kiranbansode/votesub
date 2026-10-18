import { getDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { auth, firestore } from 'config/firebase';
import { store } from 'store';
import { trackEvent } from 'utils/analytics';

const voteNow = async (candidateId: string, subjectId: string) => {
    const userIdFromStore = store.getState().user.userDetails.uid;
    const userId = auth.currentUser?.uid! || userIdFromStore;

    if (!userId) {
        return false;
    }

    const userRef = doc(firestore, 'users', userId!);
    const userData = await (await getDoc(userRef)).data();
    const candidateRef = doc(firestore, 'candidates', candidateId);

    if (userData?.remainingVotes < 0 || userData?.remainingVotes === 0) {
        throw new Error('You already gave all of your votes');
    }

    if (userData?.remainingVotes > 0) {
        /* This will increment candidate votes by 1 */
        await updateDoc(candidateRef, {
            votes: increment(1),
        });

        /* This will decrement user's remaining votes by 1 */
        await updateDoc(userRef, {
            remainingVotes: increment(-1),
        });

        trackEvent('vote_cast', {
            subject_id: subjectId,
            candidate_id: candidateId,
            vote_count: 1,
        });

        return true;
    }

    return false;
};

export default voteNow;
