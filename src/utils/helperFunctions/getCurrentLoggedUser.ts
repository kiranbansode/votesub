import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { store } from 'store';
import { SAVE_USER_AUTH_DETAILS } from 'store/loginPage/userLoginSlice';

const getCurrentLoggedUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            store.dispatch(SAVE_USER_AUTH_DETAILS(user));
        }
    });
};

export default getCurrentLoggedUser;
