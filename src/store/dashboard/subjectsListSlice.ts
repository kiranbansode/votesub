import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import getSubjectsFromFirestore from 'features/getSubjectsFromFirestore';

export const getSubjectsListFromFirestore = createAsyncThunk(
    'subjectsList',
    async (_, thunkAPI) => {
        try {
            const subjectsList = await getSubjectsFromFirestore();

            return subjectsList;
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
    reducers: {
        SAVE_UNSORTED_SUBJECTS_LIST: (state, action) => {
            state.list = action.payload;
        },

        RESET_UNSORTED_SUBJECTS_LIST: (state) => {
            state.list = initialState.list;
            state.error = initialState.error;
            state.loading = initialState.loading;
        },
    },
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

export const { RESET_UNSORTED_SUBJECTS_LIST, SAVE_UNSORTED_SUBJECTS_LIST } =
    subjectsListSlice.actions;

export default subjectsListSlice.reducer;
