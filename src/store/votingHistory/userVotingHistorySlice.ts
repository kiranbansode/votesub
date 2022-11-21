import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserVotingHistoryCLF } from 'config/firebase';

export const getUserVotingHistoryThunk = createAsyncThunk(
    'user-voting-history',
    async (_, thunkAPi) => {
        try {
            const res = await getUserVotingHistoryCLF();
            return res.data;
        } catch (error) {
            return thunkAPi.rejectWithValue(error);
        }
    },
);

interface IUserVotingHistorySlice {
    history: any[];
    error: null | boolean;
    loading: boolean;
}

const initialState: IUserVotingHistorySlice = {
    history: [],
    error: null,
    loading: false,
};

const userVotingHistorySlice = createSlice({
    name: 'user-voting-history',
    initialState,
    reducers: {
        RESET_USER_VOTING_HISTORY: (state) => {
            state.history = initialState.history;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserVotingHistoryThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            getUserVotingHistoryThunk.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.history = action.payload;
                state.loading = false;
                state.error = false;
            },
        );
        builder.addCase(getUserVotingHistoryThunk.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    },
});

export const { RESET_USER_VOTING_HISTORY } = userVotingHistorySlice.actions;

export default userVotingHistorySlice.reducer;
