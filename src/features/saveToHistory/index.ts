import { auth, firestore } from 'config/firebase';
import { setDoc, doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { store } from 'store';

interface ISaveToHistory {
    subjectId: string;
    candidateId: string;
    localeDate: {
        dateWithZero: string | number;
        monthWithZero: string | number;
        year: number;
    };
}

const saveToHistory = async ({ subjectId, candidateId, localeDate }: ISaveToHistory) => {
    const userIdFromStore = store.getState().user.userDetails.uid;
    const userId = auth.currentUser?.uid! || userIdFromStore;
    const { dateWithZero, monthWithZero, year } = localeDate;
    // const historyPath = `${date}${monthWithZero}${year}`;
    const historyPath = `${year}${monthWithZero}${dateWithZero}`;
    const daysSinceUnixEpoch = Math.trunc(new Date().getTime() / 1000 / 86400);
    const secondsSinceUnixEpoch = Math.trunc(new Date().getTime() / 1000);

    const historyRef = doc(firestore, 'users', userId!, 'votingHistory', historyPath);
    const subjectRef = doc(firestore, 'subjects', subjectId);
    const candidateRef = doc(firestore, 'candidates', candidateId);
    const historySnap = await getDoc(historyRef);

    try {
        let res;
        const subjectName = await (await getDoc(subjectRef)).get('subjectName');
        const candidateName = await (await getDoc(candidateRef)).get('candidateName');

        if (!historySnap.exists()) {
            res = await setDoc(historyRef, {
                createdOn: secondsSinceUnixEpoch,
                historyPath,
                id: daysSinceUnixEpoch,
                localeDate,
                history: {
                    [subjectId]: {
                        [candidateId]: { candidateName, candidateId, givenVotes: increment(1) },
                        lastUpdatedOn: secondsSinceUnixEpoch,
                        subjectName,
                    },
                },
            });
            return res;
        }

        res = await updateDoc(historyRef, {
            [`history.${subjectId}.${candidateId}.givenVotes`]: increment(1),
            [`history.${subjectId}.lastUpdatedOn`]: secondsSinceUnixEpoch,
        });

        return res;
    } catch (error) {
        return error;
    }
};
export default saveToHistory;
