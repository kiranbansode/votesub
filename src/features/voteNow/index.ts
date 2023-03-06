import { getDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { auth, firestore } from 'config/firebase';
import { store } from 'store';

const voteNow = async (candidateId: string) => {
    const userIdFromStore = store.getState().user.userDetails.uid;
    const userId = auth.currentUser?.uid! || userIdFromStore;

    if (userId === null) {
        return;
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
    }
};

export default voteNow;
