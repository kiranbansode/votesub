import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'config/firebase';
import { store } from 'store';
import {
    CHECK_EXISTING_USER_AUTH_DETAILS,
    EXISTING_USER_AUTH_DETAILS_NOT_FOUND,
    SAVE_EXISTING_USER_AUTH_DETAILS,
} from 'store/loginPage/userLoginSlice';

/**
 * `getCurrentLoggedUser` fn will find any existing user's auth details, if found save it in store.
 *
 * @remarks Always put getCurrentLogged User fn inside `useEffect`, `otherwise` it will enter into `infinite loop`
 */
const getCurrentLoggedUser = () => {
    onAuthStateChanged(auth, (user: any) => {
        store.dispatch(CHECK_EXISTING_USER_AUTH_DETAILS());

        if (user === null) {
            store.dispatch(EXISTING_USER_AUTH_DETAILS_NOT_FOUND());
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
                    providerId,
                    uid,
                }),
            );
        }
    });
};

export default getCurrentLoggedUser;
