import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISubjectData } from 'types/subjectDetails/index';
import splitArray from 'utils/helperFunctions/splitArray';

interface ISortedSubjectList {
    list: ISubjectData[][];
}

const initialState: ISortedSubjectList = {
    list: [],
};

const sortedSubjectsList = createSlice({
    name: 'sorted-subjects',
    initialState,
    reducers: {
        SHOW_ONLY_FIVE: (state, action: PayloadAction<ISubjectData[]>) => {
            const sortedList = splitArray(action.payload, 5);
            // @ts-ignore
            state.list = sortedList;
        },

        SHOW_ONLY_TEN: (state, action: PayloadAction<ISubjectData[]>) => {
            const sortedList = splitArray(action.payload, 10);
            // @ts-ignore
            state.list = sortedList;
        },

        SHOW_ONLY_TWENTY: (state, action: PayloadAction<ISubjectData[]>) => {
            const sortedList = splitArray(action.payload, 20);
            // @ts-ignore
            state.list = sortedList;
        },

        RESET_SORTED_SUBJECTS_LIST: (state) => {
            state.list = initialState.list;
        },
    },
});

export const { SHOW_ONLY_FIVE, SHOW_ONLY_TEN, SHOW_ONLY_TWENTY, RESET_SORTED_SUBJECTS_LIST } =
    sortedSubjectsList.actions;

export default sortedSubjectsList.reducer;
