import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, UserInfo, UserCredential, signOut } from 'firebase/auth';
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
            isEmailVerified: user.emailVerified,
            displayName: user.displayName,
            profilePhoto: user.photoURL,
            role: (await auth.currentUser?.getIdTokenResult())?.claims.role,
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

const signOutCurrentUser = () => {
    signOut(auth).then((mssg) => mssg);
};

export interface IUserInfo {
    userDetails: UserInfo;
    // userDetails: {
    //     uid: UserInfo['uid'];
    //     email: UserInfo['email'];
    //     isEmailVerified: boolean | null;
    //     username: UserInfo['displayName'];
    //     profilePhoto: UserInfo['photoURL'];
    // };
    loading: boolean;
    error: any;
}

const initialState: IUserInfo = {
    userDetails: {
        uid: '',
        displayName: '',
        email: '',
        phoneNumber: '',
        photoURL: '',
        providerId: '',
    },
    loading: false,
    error: {},
};

const userLoginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SAVE_USER_AUTH_DETAILS: {
            reducer: (state, action: PayloadAction<UserInfo>) => {
                state.userDetails = action.payload;
            },

            prepare: (payload: UserInfo) => {
                const { displayName, email, phoneNumber, photoURL, providerId, uid } = payload;
                return { payload: { displayName, email, phoneNumber, photoURL, providerId, uid } };
            },
        },

        RESET_AUTH_DETAILS: (state) => {
            state.userDetails = initialState.userDetails;
            state.error = initialState.error;
            state.loading = initialState.loading;
        },

        SIGNOUT_USER_AND_RESET_AUTH_DETAILS: (state) => {
            state.userDetails = initialState.userDetails;
            state.error = initialState.error;
            state.loading = initialState.loading;
            signOutCurrentUser();
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

export const { SAVE_USER_AUTH_DETAILS, RESET_AUTH_DETAILS, SIGNOUT_USER_AND_RESET_AUTH_DETAILS } =
    userLoginSlice.actions;

export default userLoginSlice.reducer;
