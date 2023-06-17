import { createSlice } from '@reduxjs/toolkit';
import { ISubjectData } from 'types/subjectDetails';

interface IFilteredSubjects {
    list: ISubjectData[] | [] | null;
    error: boolean;
    loading: boolean;
}

const initialState: IFilteredSubjects = {
    list: [],
    error: false,
    loading: false,
};

const saveFilteredSubjectSlice = createSlice({
    name: 'filteredSubject',
    initialState,
    reducers: {
        SAVE_FILTERED_SUBJECTS: (state, action) => {
            state.list = action.payload;
            state.error = false;
            state.loading = false;
        },

        SAVE_ERROR_FILTERED_SUBJECTS: (state, action) => {
            state.list = action.payload;
            state.error = true;
            state.loading = false;
        },

        RESET_FILTERED_SUBJECTS: (state) => {
            state.list = initialState.list;
            state.error = initialState.error;
            state.loading = initialState.loading;
        },
    },
});

export const { RESET_FILTERED_SUBJECTS, SAVE_FILTERED_SUBJECTS, SAVE_ERROR_FILTERED_SUBJECTS } =
    saveFilteredSubjectSlice.actions;

export default saveFilteredSubjectSlice.reducer;
