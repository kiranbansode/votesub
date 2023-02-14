import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sendUserPasswordResetEmail from 'features/sendUserPasswordResetEmail';

interface IPasswordResetSliceRejectWithValue {
    code: string | undefined;
    name: string | undefined;
}

interface IPasswordResetSliceResponse {
    status: number | null;
    mssg: string;
}

interface IPasswordResetSlice {
    res: IPasswordResetSliceResponse;
    error: IPasswordResetSliceRejectWithValue;
    loading: boolean;
}

// TODO: Look more into createAsyncThunk types and remove any with proper types
export const passwordResetThunk = createAsyncThunk<
    any,
    any,
    { rejectValue: IPasswordResetSliceRejectWithValue }
>(
    'passwordReset/PASSWORD_RESET_THUNK',
    async (data: string, { rejectWithValue, fulfillWithValue }): Promise<any> => {
        try {
            await sendUserPasswordResetEmail(data);

            return fulfillWithValue({
                status: 201,
                mssg: 'An email containing Password Reset link was sent to you entered Email ID',
            });
        } catch (error) {
            // @ts-ignore
            const { code, name } = error;
            return rejectWithValue({ code, name });
        }
    },
);

const initialState = {
    res: {
        status: null,
        mssg: '',
    },
    error: {
        code: '',
        name: '',
    },
    // error: false,
    loading: false,
} as IPasswordResetSlice;

const passwordResetSlice = createSlice({
    name: 'passwordReset',
    initialState,
    reducers: {
        SAVE_PASSWORD_RESET_RESPONSE: () => {},

        SAVE_ERROR_FOR_PASSWORD_RESET_SLICE: () => {},

        RESET_PASSWORD_RESET_SLICE: (state) => {
            state.res = initialState.res;
            state.error = initialState.error;
            state.loading = initialState.loading;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(passwordResetThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(passwordResetThunk.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.res.status = payload.status;
            state.res.mssg = payload.mssg;
            state.error.code = '';
            state.error.name = '';
        });
        builder.addCase(passwordResetThunk.rejected, (state, { payload }) => {
            state.error.code = payload?.code;
            state.error.name = payload?.name;
            state.loading = false;
        });
    },
});

export const {
    SAVE_ERROR_FOR_PASSWORD_RESET_SLICE,
    RESET_PASSWORD_RESET_SLICE,
    SAVE_PASSWORD_RESET_RESPONSE,
} = passwordResetSlice.actions;

export default passwordResetSlice.reducer;
