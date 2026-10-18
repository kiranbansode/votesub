import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { firestore, auth } from 'config/firebase';
import { store } from 'store';
import { trackEvent } from 'utils/analytics';

interface IFeedback {
    ux: 'a' | 'b' | 'c' | 'd';
    ui: 'a' | 'b' | 'c' | 'd';
    performance: 'a' | 'b' | 'c' | 'd';
    ratings: number;
    mssg: string;
}

const saveToFeedback = async (feedback: IFeedback) => {
    const { ux, ui, performance, ratings, mssg } = feedback;
    const userIdFromStore = store.getState().user.userDetails.uid;
    const userId = auth.currentUser?.uid! || userIdFromStore;
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

        trackEvent('feedback_submit', {
            rating: ratings,
            ux_rating: ux,
            ui_rating: ui,
            performance_rating: performance,
        });

        return { res, code: 201, mssg: 'Feedback saved successfully.' };
    } catch (error) {
        return error;
    }
};

export default saveToFeedback;
