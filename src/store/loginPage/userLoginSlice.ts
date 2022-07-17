import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserLoginFormTypes } from 'pages/LoginPage';
import { signInWithEmailAndPassword, UserInfo, UserCredential } from 'firebase/auth';
import { auth } from 'config/firebase';
import authErrorMessageFinder from 'utils/helperFunctions/authErrorMessageFinder';

export const userLogIn = createAsyncThunk(
    'user/LogIn',
    async (data: UserLoginFormTypes, { rejectWithValue }) => {
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
                isEmailVerified: user.emailVerified,
                username: user.displayName,
                profilePhoto: user.photoURL,
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
    },
);

export interface IUserInfo {
    userDetails: {
        uid: UserInfo['uid'];
        email: UserInfo['email'];
        isEmailVerified: boolean | null;
        username: UserInfo['displayName'];
        profilePhoto: UserInfo['photoURL'];
    };
    loading: boolean;
    error: any;
    ui: {
        showLoginSuccessMssg: boolean;
    };
}

const initialState: IUserInfo = {
    userDetails: {
        uid: '',
        email: '',
        isEmailVerified: null,
        username: '',
        profilePhoto: '',
    },
    loading: false,
    error: {},
    ui: {
        showLoginSuccessMssg: false,
    },
};

const userLoginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SHOW_LOGIN_SUCCESS_MSSG: (state) => {
            state.ui.showLoginSuccessMssg = true;
        },

        HIDE_LOGIN_SUCCESS_MSSG: (state) => {
            state.ui.showLoginSuccessMssg = false;
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

        /* TODO: Remove any type and use proper one */
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

export const { SHOW_LOGIN_SUCCESS_MSSG, HIDE_LOGIN_SUCCESS_MSSG } = userLoginSlice.actions;

export default userLoginSlice.reducer;

// from PayloadAction<IUserInfo['userDetails']>
//    payload: {
//     uid: UserInfo['uid'];
//     email: UserInfo['email'];
//     isEmailVerified: boolean | null;
//     username: UserInfo['displayName'];
//     profilePhoto: UserInfo['photoURL'];
// }

// from IUserInfo['userDetails']
//   userDetails: WritableDraft<{
//     uid: UserInfo['uid'];
//     email: UserInfo['email'];
//     isEmailVerified: boolean | null;
//     username: UserInfo['displayName'];
//     profilePhoto: UserInfo['photoURL'];
// }>
