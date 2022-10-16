import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { nanoid } from 'nanoid';
import { addNewSubjectCLF } from 'config/firebase';
import toProperCase from 'utils/helperFunctions/toProperCase';

interface ICandidate {
    id: string;
    candidateName: string;
}

interface IAddNewTopicSlice {
    subject: string;
    id: string;
    candidates: ICandidate[];
    loading: boolean;
}

const initialState: IAddNewTopicSlice = {
    subject: '',
    id: '',
    candidates: [],
    loading: false,
};

export const addNewTopicThunk = createAsyncThunk(
    'addNewTopic',
    async (data: any, { getState, rejectWithValue }) => {
        const {
            user: { userDetails },
            addNewTopic,
        } = getState() as RootState;
        const subjectId = nanoid();

        try {
            const response = await addNewSubjectCLF({
                id: subjectId,
                subject: data.subject,
                submittedBy: userDetails.displayName,
                userId: userDetails.uid,
                candidates: addNewTopic.candidates,
            });
        } catch (error) {
            rejectWithValue(error);
        }
    },
);

const addNewTopicSlice = createSlice({
    name: 'addNewTopic',
    initialState,
    reducers: {
        ADD_CANDIDATE: {
            reducer: (state, action: PayloadAction<ICandidate>) => {
                state.candidates.push(action.payload);
            },
            prepare: (candidate: ICandidate['candidateName']) => {
                const id = nanoid();
                const candidateName = toProperCase(candidate);

                return {
                    payload: {
                        id,
                        candidateName,
                    },
                };
            },
        },

        DELETE_CANDIDATE: (state, action: PayloadAction<ICandidate['id']>) => {
            state.candidates = state.candidates.filter(
                (candidate) => candidate.id !== action.payload,
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addNewTopicThunk.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(addNewTopicThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
        });

        builder.addCase(addNewTopicThunk.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
        });
    },
});

export const { ADD_CANDIDATE, DELETE_CANDIDATE } = addNewTopicSlice.actions;

export default addNewTopicSlice.reducer;
