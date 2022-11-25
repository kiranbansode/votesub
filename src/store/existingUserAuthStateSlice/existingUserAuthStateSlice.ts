import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INeededUserCredentials } from 'types/userAuth';

interface IUserAuthStateSlice {
    userDetails: INeededUserCredentials;
    allowUser: null | boolean;
    loading: boolean;
}

const initialState: IUserAuthStateSlice = {
    userDetails: {
        uid: '',
        email: '',
        emailVerified: false,
        displayName: '',
        phoneNumber: '',
        photoURL: '',
        providerId: '',
    },
    allowUser: null,
    loading: true,
};

const existingUserAuthStateSlice = createSlice({
    name: 'existing-user-auth',
    initialState,
    reducers: {
        SAVE_EXISTING_USER_AUTH_DETAILS: (
            state,
            { payload }: PayloadAction<INeededUserCredentials>,
        ) => {
            const { displayName, email, emailVerified, phoneNumber, photoURL, uid, providerId } =
                payload;

            state.userDetails.uid = uid;
            state.userDetails.email = email;
            state.userDetails.emailVerified = emailVerified;
            state.userDetails.displayName = displayName;
            state.userDetails.phoneNumber = phoneNumber;
            state.userDetails.photoURL = photoURL;
            state.userDetails.providerId = providerId;

            if (uid) {
                state.allowUser = true;
                state.loading = false;
            }
        },
        NOT_FOUND_EXISTING_LOGGED_USER: (state) => {
            state.allowUser = initialState.allowUser;
            state.userDetails = initialState.userDetails;
            state.loading = false;
        },

        RESET_EXISTING_USER_AUTH_DETAILS: (state) => {
            state.allowUser = initialState.allowUser;
            state.userDetails = initialState.userDetails;
        },
    },
});

export const {
    SAVE_EXISTING_USER_AUTH_DETAILS,
    RESET_EXISTING_USER_AUTH_DETAILS,
    NOT_FOUND_EXISTING_LOGGED_USER,
} = existingUserAuthStateSlice.actions;

export default existingUserAuthStateSlice.reducer;
