import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import getUserVotingHistory from 'utils/helperFunctions/getUserVotingHistory';

export const getUserVotingHistoryThunk = createAsyncThunk(
    'user-voting-history',
    async (_, thunkAPI) => {
        try {
            const res = await getUserVotingHistory();
            return thunkAPI.fulfillWithValue(res);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

interface IHttpsError {
    code?: string | null;
    message: string | null;
    status?: number | null;
}

interface IUserVotingHistorySlice {
    history: any[];
    error: IHttpsError;
    loading: boolean;
}

const initialState: IUserVotingHistorySlice = {
    history: [],
    error: {
        code: null,
        message: null,
        status: null,
    },
    loading: false,
};

const userVotingHistorySlice = createSlice({
    name: 'user-voting-history',
    initialState,
    reducers: {
        RESET_USER_VOTING_HISTORY: (state) => {
            state.history = initialState.history;
            state.error = initialState.error;
            state.loading = initialState.loading;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserVotingHistoryThunk.pending, (state) => {
            state.loading = true;
            state.history = initialState.history;
            state.error = initialState.error;
        });
        builder.addCase(
            getUserVotingHistoryThunk.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.history = action.payload;
                state.error = initialState.error;
                state.loading = false;
            },
        );
        builder.addCase(getUserVotingHistoryThunk.rejected, (state, action: PayloadAction<any>) => {
            const { message } = action.payload;
            state.loading = false;
            state.error.message = message;
        });
    },
});

export const { RESET_USER_VOTING_HISTORY } = userVotingHistorySlice.actions;

export default userVotingHistorySlice.reducer;
