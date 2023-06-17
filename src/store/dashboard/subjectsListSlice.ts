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
    errorMssg: string;
    loading: boolean;
}

const initialState: ISubjectsList = {
    list: [],
    error: false,
    errorMssg: '',
    loading: false,
};

const subjectsListSlice = createSlice({
    name: 'subjectsList',
    initialState,
    reducers: {
        SAVE_UNSORTED_SUBJECTS_LIST: (state, action) => {
            state.list = action.payload;
        },

        ERROR_SAVE_UNSORTED_SUBJECTS_LIST: (state, action) => {
            state.error = !!action.payload.message;
            state.errorMssg = action.payload.message;
        },

        RESET_UNSORTED_SUBJECTS_LIST: (state) => {
            state.list = initialState.list;
            state.error = initialState.error;
            state.errorMssg = initialState.errorMssg;
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
                state.errorMssg = action.payload.message;
                state.error = !!action.payload.message;
            },
        );
    },
});

export const {
    RESET_UNSORTED_SUBJECTS_LIST,
    SAVE_UNSORTED_SUBJECTS_LIST,
    ERROR_SAVE_UNSORTED_SUBJECTS_LIST,
} = subjectsListSlice.actions;

export default subjectsListSlice.reducer;
