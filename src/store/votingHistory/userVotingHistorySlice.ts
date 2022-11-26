import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserVotingHistoryCLF } from 'config/firebase';

export const getUserVotingHistoryThunk = createAsyncThunk(
    'user-voting-history',
    async (_, thunkAPI) => {
        try {
            const res = await getUserVotingHistoryCLF();

            // @ts-ignore
            if (res.data?.code) {
                return thunkAPI.rejectWithValue(res.data);
            }

            return thunkAPI.fulfillWithValue(res.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

interface IHttpsError {
    code: string | null;
    mssg: string | null;
    status: number | null;
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
        mssg: null,
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
            state.loading = false;
            state.error.code = action.payload.code;
            state.error.mssg = action.payload.details;
            state.error.status = action.payload.httpErrorCode.status;
        });
    },
});

export const { RESET_USER_VOTING_HISTORY } = userVotingHistorySlice.actions;

export default userVotingHistorySlice.reducer;
