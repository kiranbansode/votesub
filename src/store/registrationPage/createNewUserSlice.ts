import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createNewUserCLF } from 'config/firebase';

export const createNewUserThunk = createAsyncThunk(
    'CREATE-NEW-USER',
    async (userData: any, thunkAPI) => {
        try {
            const userCredentials = await createNewUserCLF(userData);

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
