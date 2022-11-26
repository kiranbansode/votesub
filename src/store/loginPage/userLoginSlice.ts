import { INeededUserCredentials } from 'types/userAuth/index';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth } from 'config/firebase';
import authErrorMessageFinder from 'utils/helperFunctions/authErrorMessageFinder';

export const userLogIn = createAsyncThunk('user/LogIn', async (data: any, { rejectWithValue }) => {
    try {
        const userCredentials: UserCredential = await signInWithEmailAndPassword(
            auth,
            data.username,
            data.password,
        );

        const { user } = userCredentials;

        return {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            photoUrl: user.photoURL,
            providerId: user.providerId,
        };
    } catch (error: any) {
        const authErrorMessage = authErrorMessageFinder(error);
        return rejectWithValue({
            name: error.name,
            code: error.code,
            message: authErrorMessage,
            customData: error.customData,
        });
    }
});

export interface IUserInfo {
    userDetails: INeededUserCredentials;
    loading: boolean;
    showSucMssg: boolean;
    shouldShowLoginPage: boolean;
    error: any;
}

const initialState: IUserInfo = {
    userDetails: {
        uid: '',
        displayName: '',
        email: '',
        emailVerified: false,
        phoneNumber: '',
        photoURL: '',
        providerId: '',
    },
    loading: false,
    showSucMssg: false,
    shouldShowLoginPage: false,
    error: {},
};

const userLoginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SAVE_USER_AUTH_DETAILS: {
            reducer: (state, action: PayloadAction<any>) => {
                state.userDetails = action.payload;
                state.showSucMssg = true;
            },

            prepare: (payload: IUserInfo['userDetails']) => {
                const {
                    displayName,
                    email,
                    phoneNumber,
                    photoURL,
                    providerId,
                    uid,
                    emailVerified,
                } = payload;
                return {
                    payload: {
                        displayName,
                        email,
                        phoneNumber,
                        photoURL,
                        providerId,
                        uid,
                        emailVerified,
                    },
                };
            },
        },

        RESET_AUTH_DETAILS: (state) => {
            state.userDetails = initialState.userDetails;
            state.error = initialState.error;
            state.loading = initialState.loading;
        },

        RESET_AUTH_ERROR_STATE: (state) => {
            state.error = initialState.error;
            state.loading = initialState.loading;
        },

        SIGNOUT_USER_AND_RESET_AUTH_DETAILS: (state) => {
            state.userDetails = initialState.userDetails;
            state.error = initialState.error;
            state.loading = initialState.loading;
        },

        SHOW_LOGIN_PAGE: (state) => {
            state.shouldShowLoginPage = true;
        },

        HIDE_LOGIN_PAGE: (state) => {
            state.shouldShowLoginPage = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userLogIn.pending, (state) => {
            state.loading = true;
        });

        /*
         * As per below link, there is a bug in RTK.
         * https://github.com/reduxjs/redux-toolkit/issues/1707#issuecomment-962883993
         * So, as for now use `any` for PayloadAction type
         */

        /* TODO: Remove type any and use right one */
        //! PayloadAction types should not be any
        builder.addCase(userLogIn.fulfilled, (state, action: PayloadAction<any>) => {
            state.userDetails = action.payload;
            state.loading = false;
        });

        //! PayloadAction types should not be any
        builder.addCase(userLogIn.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
});

export const {
    SAVE_USER_AUTH_DETAILS,
    RESET_AUTH_DETAILS,
    RESET_AUTH_ERROR_STATE,
    SIGNOUT_USER_AND_RESET_AUTH_DETAILS,
    SHOW_LOGIN_PAGE,
    HIDE_LOGIN_PAGE,
} = userLoginSlice.actions;

export default userLoginSlice.reducer;
