import { createSlice } from '@reduxjs/toolkit';

type TGlobalUIState = {
    showSidebar: boolean;
    showRegistrationSuccessPopUp: boolean;
    showSignSuccessPopUp: boolean;
    allowUserToSignIn: boolean;
    showLoginPage: boolean;
    showSignOutSuccessPopUp: boolean;
};

const initialState: TGlobalUIState = {
    showSidebar: false,
    showRegistrationSuccessPopUp: false,
    showSignSuccessPopUp: false,
    allowUserToSignIn: false,
    showLoginPage: false,
    showSignOutSuccessPopUp: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        SHOW_SIDEBAR: (state) => {
            const sidebar = document.querySelector('#sidebar')! as HTMLElement;
            const navLinks = document.querySelector('.nav-links')! as HTMLElement;

            navLinks.classList.remove('animate__slideOutLeft');
            navLinks.classList.add('animate__slideInLeft');

            sidebar.classList.remove('animate__fadeOut');
            sidebar.classList.add('animate__fadeIn');

            state.showSidebar = !state.showSidebar;
            sidebar.style.display = 'block';
        },

        SHOW_LOGIN_PAGE: (state) => {
            state.showLoginPage = true;
        },

        HIDE_LOGIN_PAGE: (state) => {
            state.showLoginPage = false;
        },

        HIDE_SIDEBAR: (state) => {
            const sidebar = document.querySelector('#sidebar')! as HTMLElement;
            const navLinks = document.querySelector('.nav-links')! as HTMLElement;

            navLinks.classList.remove('animate__slideInLeft');
            navLinks.classList.add('animate__slideOutLeft');

            sidebar.classList.add('animate__fadeOut');
            sidebar.classList.remove('animate__fadeIn');

            state.showSidebar = !state.showSidebar;

            setTimeout(() => {
                sidebar.style.display = 'none';
            }, 400);
        },

        SHOW_REGISTRATION_SUCCESS_POP_UP: (state) => {
            state.showRegistrationSuccessPopUp = true;
        },

        HIDE_REGISTRATION_SUCCESS_POP_UP: (state) => {
            state.showRegistrationSuccessPopUp = false;
        },

        SHOW_SIGN_IN_SUCCESS_POP_UP: (state) => {
            state.showSignSuccessPopUp = true;
        },

        HIDE_SIGN_IN_SUCCESS_POP_UP: (state) => {
            state.showSignSuccessPopUp = false;
        },

        SHOW_SIGN_OUT_SUCCESS_POP_UP: (state) => {
            state.showSignOutSuccessPopUp = true;
        },

        HIDE_SIGN_OUT_SUCCESS_POP_UP: (state) => {
            state.showSignOutSuccessPopUp = false;
        },

        ALLOW_USER_TO_SIGN_IN: (state) => {
            state.allowUserToSignIn = true;
        },

        DONT_ALLOW_USER_TO_SIGN_IN: (state) => {
            state.allowUserToSignIn = false;
        },
    },
});

export const {
    SHOW_SIDEBAR,
    HIDE_SIDEBAR,
    SHOW_REGISTRATION_SUCCESS_POP_UP,
    HIDE_REGISTRATION_SUCCESS_POP_UP,
    SHOW_SIGN_IN_SUCCESS_POP_UP,
    HIDE_SIGN_IN_SUCCESS_POP_UP,
    ALLOW_USER_TO_SIGN_IN,
    DONT_ALLOW_USER_TO_SIGN_IN,
    SHOW_LOGIN_PAGE,
    HIDE_LOGIN_PAGE,
    SHOW_SIGN_OUT_SUCCESS_POP_UP,
    HIDE_SIGN_OUT_SUCCESS_POP_UP,
} = uiSlice.actions;

export default uiSlice.reducer;
