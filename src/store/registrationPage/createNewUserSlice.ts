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
            const userCredentials = await createNewUserCLF(newUserData);

            return userCredentials.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

const initialState = {
    loading: false,
    data: {},
    error: null,
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
        });

        builder.addCase(createNewUserThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = action.payload;
            state.loading = false;
        });

        builder.addCase(createNewUserThunk.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
});

export const { resetCreateNewUserSlice } = createNewUserSlice.actions;
export default createNewUserSlice.reducer;
