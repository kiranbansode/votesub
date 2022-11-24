import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createNewUserCLF } from 'config/firebase';
import { RootState } from 'store';

/**
 * `createNewUserThunk` will help to add new users to Firebase using Firebase's Admin SDKs.
 *  It will also save their details in Firestore.
 * @author Kiran A. Bansode <kiran5120135@gmail.com> <czar.kiran@gmail.com>
 * @param {object} formData form data from registrations[`Student`, `Teacher`, `Employer`, `Developer`] page
 */

export const createNewUserThunk = createAsyncThunk(
    'CREATE-NEW-USER',
    async (formData: any, thunkAPI) => {
        /**
         * ! Always use thunkAPI.getState() to get latest snapshot of redux store
         */
        const { userRole } = thunkAPI.getState() as RootState;
        const newUserData = { ...formData, ...userRole };

        try {
            const res = await createNewUserCLF(newUserData);

            // @ts-ignore
            if (res.data.errorInfo.code) return thunkAPI.rejectWithValue(res.data);

            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

interface IHttpsError {
    code: string | null;
    mssg: string | null;
    //  status: number | null;
}

interface ICreateNewUser {
    loading: boolean;
    data: any;
    error: IHttpsError;
}

const initialState: ICreateNewUser = {
    loading: false,
    data: {},
    error: {
        code: null,
        mssg: null,
        // status: null,
    },
};

const createNewUserSlice = createSlice({
    name: 'createNewUser',
    initialState,
    reducers: {
        resetCreateNewUserSlice: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(createNewUserThunk.pending, (state) => {
            state.loading = true;
            state.error = initialState.error;
        });

        builder.addCase(createNewUserThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.data = action.payload;
            state.error = initialState.error;
        });

        builder.addCase(createNewUserThunk.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error.code = action.payload.errorInfo.code;
            state.error.mssg = action.payload.errorInfo.message;
            //  state.error.status = action.payload.httpErrorCode.status;
        });
    },
});

export const { resetCreateNewUserSlice } = createNewUserSlice.actions;
export default createNewUserSlice.reducer;
