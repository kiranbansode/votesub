import { createSlice } from '@reduxjs/toolkit';

type TGlobalUIState = {
    showSidebar: boolean;
    showRegistrationSuccessPopUp: boolean;
    showSignSuccessPopUp: boolean;
    allowUserToSignIn: boolean;
    showLoginPage: boolean;
};

const initialState: TGlobalUIState = {
    showSidebar: false,
    showRegistrationSuccessPopUp: false,
    showSignSuccessPopUp: false,
    allowUserToSignIn: false,
    showLoginPage: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        SHOW_SIDEBAR: (state) => {
            const sidebar = document.querySelector('#sidebar')! as HTMLElement;
            sidebar.style.display = 'block';
            state.showSidebar = !state.showSidebar;
        },

        SHOW_LOGIN_PAGE: (state) => {
            state.showLoginPage = true;
        },

        HIDE_LOGIN_PAGE: (state) => {
            state.showLoginPage = false;
        },

        HIDE_SIDEBAR: (state) => {
            const sidebar = document.querySelector('#sidebar')! as HTMLElement;
            sidebar.style.display = 'none';
            state.showSidebar = !state.showSidebar;
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
} = uiSlice.actions;

export default uiSlice.reducer;
