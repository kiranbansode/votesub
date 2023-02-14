import { auth } from 'config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const sendUserPasswordResetEmail = async (emailId: string) => {
    const res = await sendPasswordResetEmail(auth, emailId);
    return res;
};

export default sendUserPasswordResetEmail;
