import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { firestore, auth } from 'config/firebase';

interface IFeedback {
    ux: 'a' | 'b' | 'c' | 'd';
    ui: 'a' | 'b' | 'c' | 'd';
    performance: 'a' | 'b' | 'c' | 'd';
    rating: number;
    mssg: string;
}

const saveToFeedback = async (feedback: IFeedback) => {
    const { ux, ui, performance, rating, mssg } = feedback;
    const userId = auth.currentUser?.uid;
    const feedbackId = nanoid();
    const feedbackRef = doc(firestore, 'feedbacks', feedbackId);

    try {
        await setDoc(feedbackRef, {
            userId,
            feedbackId,
            ux,
            ui,
            performance,
            rating,
            mssg,
            submittedOn: serverTimestamp(),
        });

        return { code: 201, mssg: 'Feedback saved successfully.' };
    } catch (error) {
        return error;
    }
};

export default saveToFeedback;
