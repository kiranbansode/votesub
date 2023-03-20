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
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoUrl: user.photoURL,
            providerId: user.providerId,
            uid: user.uid,
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
    loading: {
        new: boolean;
        existing: boolean;
    };
    error: any;
}

const initialState: IUserInfo = {
    userDetails: {
        displayName: '',
        email: '',
        emailVerified: false,
        phoneNumber: '',
        photoURL: '',
        providerId: '',
        uid: '',
    },
    loading: {
        new: false,
        existing: false,
    },
    error: {},
};

const userLoginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        CHECK_EXISTING_USER_AUTH_DETAILS: (state) => {
            state.loading.existing = true;
        },

        SAVE_EXISTING_USER_AUTH_DETAILS: (state, { payload }) => {
            state.loading.existing = false;
            state.userDetails = payload;
            state.error = initialState.error;
        },

        EXISTING_USER_AUTH_DETAILS_NOT_FOUND: (state) => {
            state.loading.existing = false;
            state.error = initialState.error;
            state.userDetails = initialState.userDetails;
        },

        SAVE_USER_AUTH_DETAILS: {
            reducer: (state, action: PayloadAction<any>) => {
                state.userDetails = action.payload;
            },

            prepare: (payload: IUserInfo['userDetails']) => {
                const {
                    displayName,
                    email,
                    emailVerified,
                    phoneNumber,
                    photoURL,
                    providerId,
                    uid,
                } = payload;
                return {
                    payload: {
                        displayName,
                        email,
                        emailVerified,
                        phoneNumber,
                        photoURL,
                        providerId,
                        uid,
                    },
                };
            },
        },

        RESET_USER_AUTH_DETAILS: (state) => {
            state.userDetails = initialState.userDetails;
            state.error = initialState.error;
            state.loading = initialState.loading;
        },

        RESET_USER_AUTH_ERROR_STATE: (state) => {
            state.error = initialState.error;
            state.loading = initialState.loading;
        },

        SIGNOUT_USER_AND_RESET_AUTH_DETAILS: (state) => {
            state.userDetails = initialState.userDetails;
            state.error = initialState.error;
            state.loading = initialState.loading;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userLogIn.pending, (state) => {
            state.loading.new = true;
            state.userDetails = initialState.userDetails;
            state.error = initialState.error;
        });

        /*
         * As per below link, there is a bug in RTK.
         * https://github.com/reduxjs/redux-toolkit/issues/1707#issuecomment-962883993
         * So, as for now use `any` for PayloadAction type
         */

        /* TODO: Remove type any and use right one */
        //! PayloadAction types should not be any
        builder.addCase(userLogIn.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading.new = false;
            state.userDetails = action.payload;
            state.error = initialState.error;
        });

        //! PayloadAction types should not be any
        builder.addCase(userLogIn.rejected, (state, action: PayloadAction<any>) => {
            state.loading.new = false;
            state.userDetails = initialState.userDetails;
            state.error = action.payload;
        });
    },
});

export const {
    CHECK_EXISTING_USER_AUTH_DETAILS,
    SAVE_EXISTING_USER_AUTH_DETAILS,
    EXISTING_USER_AUTH_DETAILS_NOT_FOUND,
    SAVE_USER_AUTH_DETAILS,
    RESET_USER_AUTH_DETAILS,
    RESET_USER_AUTH_ERROR_STATE,
    SIGNOUT_USER_AND_RESET_AUTH_DETAILS,
} = userLoginSlice.actions;

export default userLoginSlice.reducer;
