import { getDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { auth, firestore } from 'config/firebase';

const voteNow = async (candidateId: string) => {
    const userId = auth.currentUser?.uid;

    if (userId === null) {
        return;
    }

    const userRef = doc(firestore, 'users', userId!);
    const userData = await (await getDoc(userRef)).data();
    const candidateRef = doc(firestore, 'candidates', candidateId);

    if (userData?.remainingVotes < 0 || userData?.remainingVotes === 0) {
        throw new Error('You already gave all of your votes');
    }

    if (userData?.remainingVotes < 0) {
        // sometimes due to latency user's remaining votes goes below 0
        // if that happen, this will update user's remaining votes back to 0
        await updateDoc(candidateRef, {
            votes: 0,
        });
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
