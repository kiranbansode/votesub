import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { auth, createNewUserCLF } from 'config/firebase';
import { signInWithCustomToken, UserCredential } from 'firebase/auth';
import { RootState } from 'store';
import { INeededUserCredentials } from 'types/userAuth';

interface IHttpsError {
    code: string | null;
    mssg: string | null;
}

interface ICreateNewUser {
    loading: boolean;
    data: INeededUserCredentials;
    error: IHttpsError;
}

const initialState: ICreateNewUser = {
    loading: false,
    data: {
        displayName: null,
        email: null,
        emailVerified: false,
        phoneNumber: null,
        photoURL: null,
        providerId: '',
        uid: '',
    },
    error: {
        code: null,
        mssg: null,
    },
};

/**
 * `createNewUserThunk` will help to add new users to Firebase using Firebase's Admin SDKs.
 *  It will also save their details in Firestore.
 * @author Kiran A. Bansode <kiran5120135@gmail.com> <czar.kiran@gmail.com>
 * @param {object} formData form data from registrations[`Student`, `Teacher`, `Employer`, `Developer`] page
 */

export const createNewUserThunk = createAsyncThunk(
    'CREATE-NEW-USER',
    async (formData: any, { getState, fulfillWithValue, rejectWithValue }) => {
        /**
         * ! Always use thunkAPI.getState() to get latest snapshot of redux store
         */
        const { userCategory } = getState() as RootState;
        const newUserData = { ...formData, ...userCategory };

        try {
            // eslint-disable-next-line no-shadow
            const newUserRes = (await createNewUserCLF(newUserData)).data as {
                auth: UserCredential['user'];
                customToken: string;
            };

            // @ts-ignore
            if (newUserRes?.errorInfo?.code) return rejectWithValue(newUserRes.errorInfo);

            if (newUserRes?.customToken) {
                const logInRes = (await signInWithCustomToken(auth, newUserRes?.customToken)).user;
                if (logInRes.uid) {
                    const {
                        displayName,
                        email,
                        emailVerified,
                        phoneNumber,
                        photoURL,
                        providerId,
                        uid,
                    } = logInRes;

                    return fulfillWithValue({
                        displayName,
                        email,
                        emailVerified,
                        phoneNumber,
                        photoURL,
                        providerId,
                        uid,
                    });
                }
            }

            return null;
        } catch (error) {
            const { errorInfo } = error as { errorInfo: { code: string; message: string } };
            return rejectWithValue(errorInfo);
        }
    },
);

const createNewUserSlice = createSlice({
    name: 'createNewUser',
    initialState,
    reducers: {
        RESET_REGISTRATION_SLICE: (state) => {
            state.loading = initialState.loading;
            state.data = initialState.data;
            state.error = initialState.error;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createNewUserThunk.pending, (state) => {
            state.loading = true;
            state.data = initialState.data;
            state.error = initialState.error;
        });

        builder.addCase(createNewUserThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.data = action.payload;
            state.error = initialState.error;
        });

        builder.addCase(createNewUserThunk.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.data = initialState.data;
            state.error.code = action.payload?.code;
            state.error.mssg = action.payload?.message;
        });
    },
});

export const { RESET_REGISTRATION_SLICE } = createNewUserSlice.actions;
export default createNewUserSlice.reducer;
