import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { firestore, auth } from 'config/firebase';

interface IFeedback {
    ux: 'a' | 'b' | 'c' | 'd';
    ui: 'a' | 'b' | 'c' | 'd';
    performance: 'a' | 'b' | 'c' | 'd';
    ratings: number;
    mssg: string;
}

const saveToFeedback = async (feedback: IFeedback) => {
    const { ux, ui, performance, ratings, mssg } = feedback;
    const userId = auth.currentUser?.uid;
    const feedbackId = nanoid();
    const feedbackRef = doc(firestore, 'feedbacks', feedbackId);

    try {
        const res = await setDoc(feedbackRef, {
            userId,
            feedbackId,
            ux,
            ui,
            performance,
            ratings,
            mssg,
            submittedOn: serverTimestamp(),
        });

        return { res, code: 201, mssg: 'Feedback saved successfully.' };
    } catch (error) {
        return error;
    }
};

export default saveToFeedback;
