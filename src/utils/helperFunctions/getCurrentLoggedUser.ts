import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { store } from 'store';
import { SAVE_USER_AUTH_DETAILS } from 'store/loginPage/userLoginSlice';
import { ALLOW_USER_TO_SIGN_IN, HIDE_LOGIN_PAGE } from 'store/ui';

const hideLoginPage = () => {
    const loginPage = document.querySelector('#login-page')! as HTMLElement;

    document.addEventListener('DOMContentLoaded', () => {
        loginPage.style.display = 'none';
    });
};

const getCurrentLoggedUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user?.uid) {
            hideLoginPage();
            store.dispatch(SAVE_USER_AUTH_DETAILS(user));
            store.dispatch(ALLOW_USER_TO_SIGN_IN());
            store.dispatch(HIDE_LOGIN_PAGE());
        }
    });
};

export default getCurrentLoggedUser;
