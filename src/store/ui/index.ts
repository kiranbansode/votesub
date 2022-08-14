import { createSlice } from '@reduxjs/toolkit';

type TGlobalUIState = {
    showSidebar: boolean;
    showRegistrationSuccessPopUp: boolean;
    showSignSuccessPopUp: boolean;
};

const initialState: TGlobalUIState = {
    showSidebar: false,
    showRegistrationSuccessPopUp: false,
    showSignSuccessPopUp: false,
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

        HIDE_SIDEBAR: (state) => {
            const sidebar = document.querySelector('#sidebar')! as HTMLElement;
            sidebar.style.display = 'none';
            state.showSidebar = !state.showSidebar;
        },

        SHOW_REGISTRATION_SUCCESS_POP_UP: (state) => {
            state.showRegistrationSuccessPopUp = !state.showRegistrationSuccessPopUp;
        },

        HIDE_REGISTRATION_SUCCESS_POP_UP: (state) => {
            state.showRegistrationSuccessPopUp = !state.showRegistrationSuccessPopUp;
        },

        SHOW_SIGN_SUCCESS_POP_UP: (state) => {
            state.showSignSuccessPopUp = !state.showRegistrationSuccessPopUp;
        },

        HIDE_SIGN_SUCCESS_POP_UP: (state) => {
            state.showSignSuccessPopUp = !state.showRegistrationSuccessPopUp;
        },
    },
});

export const {
    SHOW_SIDEBAR,
    HIDE_SIDEBAR,
    SHOW_REGISTRATION_SUCCESS_POP_UP,
    HIDE_REGISTRATION_SUCCESS_POP_UP,
    SHOW_SIGN_SUCCESS_POP_UP,
    HIDE_SIGN_SUCCESS_POP_UP,
} = uiSlice.actions;
export default uiSlice.reducer;
