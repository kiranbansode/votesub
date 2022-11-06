import { getSubjectsListCLF } from 'config/firebase';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export const getSubjectsListFromFirestore = createAsyncThunk(
    'subjectsList',
    async (data, thunkAPI) => {
        try {
            const subjectsList = await getSubjectsListCLF();

            return subjectsList.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

interface ISubjectsList {
    list: [];
    error: boolean;
    loading: boolean;
}

const initialState: ISubjectsList = {
    list: [],
    error: false,
    loading: false,
};

const subjectsListSlice = createSlice({
    name: 'subjectsList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSubjectsListFromFirestore.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            getSubjectsListFromFirestore.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.list = action.payload;
            },
        );

        builder.addCase(
            getSubjectsListFromFirestore.rejected,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            },
        );
    },
});

export default subjectsListSlice.reducer;
