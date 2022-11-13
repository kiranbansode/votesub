import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    currentPage: 0,
};

const pageTracker = createSlice({
    name: 'pagination-page',
    initialState,
    reducers: {
        SAVE_CURRENT_PAGE: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },

        NEXT_PAGE: (state, action: PayloadAction<number>) => {
            if (action.payload === state.currentPage + 1) {
                return;
            }

            state.currentPage += 1;
        },

        PREVIOUS_PAGE: (state) => {
            if (state.currentPage === 0) {
                return;
            }

            state.currentPage -= 1;
        },

        RESET_CURRENT_PAGE: (state) => {
            state.currentPage = initialState.currentPage;
        },
    },
});

export const { SAVE_CURRENT_PAGE, RESET_CURRENT_PAGE, NEXT_PAGE, PREVIOUS_PAGE } =
    pageTracker.actions;

export default pageTracker.reducer;
