import { auth, firestore } from 'config/firebase';
import { setDoc, doc, getDoc, updateDoc, increment } from 'firebase/firestore';

interface ISaveToHistory {
    subjectId: string;
    candidateId: string;
    localeDate: {
        date: number;
        monthWithZero: string | number;
        year: number;
    };
}

const saveToHistory = async ({ subjectId, candidateId, localeDate }: ISaveToHistory) => {
    const userId = auth.currentUser?.uid;
    const { date, monthWithZero, year } = localeDate;
    const historyPath = `${date}${monthWithZero}${year}`;
    const daysSinceUnixEpoch = Math.trunc(new Date().getTime() / 1000 / 86400);
    const secondsSinceUnixEpoch = Math.trunc(new Date().getTime() / 1000);

    const historyRef = doc(firestore, 'users', userId!, 'votingHistory', historyPath);
    const historySnap = await getDoc(historyRef);

    try {
        let res;
        if (!historySnap.exists()) {
            res = await setDoc(historyRef, {
                createdOn: secondsSinceUnixEpoch,
                historyPath,
                id: daysSinceUnixEpoch,
                localeDate,
                history: {
                    [subjectId]: {
                        [candidateId]: increment(1),
                        lastUpdatedOn: secondsSinceUnixEpoch,
                    },
                },
            });
            return res;
        }

        res = await updateDoc(historyRef, {
            [`history.${subjectId}.${candidateId}`]: increment(1),
            [`history.${subjectId}.lastUpdatedOn`]: secondsSinceUnixEpoch,
        });

        return res;
    } catch (error) {
        return error;
    }
};
export default saveToHistory;
