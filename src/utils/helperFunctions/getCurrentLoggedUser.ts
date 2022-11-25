import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'config/firebase';
import { store } from 'store';
import {
    NOT_FOUND_EXISTING_LOGGED_USER,
    SAVE_EXISTING_USER_AUTH_DETAILS,
} from 'store/existingUserAuthStateSlice/existingUserAuthStateSlice';

const hideLoginPage = () => {
    const loginPage = document.querySelector('#login-page')! as HTMLElement;

    document.addEventListener('DOMContentLoaded', () => {
        loginPage.style.display = 'none';
    });
};

const getCurrentLoggedUser = () =>
    onAuthStateChanged(auth, (user: any) => {
        if (user === null) {
            store.dispatch(NOT_FOUND_EXISTING_LOGGED_USER());
            return;
        }

        const { displayName, email, emailVerified, phoneNumber, photoURL, uid, providerId } = user;

        if (user?.uid) {
            store.dispatch(
                SAVE_EXISTING_USER_AUTH_DETAILS({
                    displayName,
                    email,
                    emailVerified,
                    phoneNumber,
                    photoURL,
                    uid,
                    providerId,
                }),
            );
        }
    });

export default getCurrentLoggedUser;
