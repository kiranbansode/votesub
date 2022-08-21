import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { nanoid } from 'nanoid';
import toProperCase from 'utils/helperFunctions/toProperCase';

interface ICandidate {
    id: string;
    candidateName: string;
}

interface IAddNewTopicSlice {
    subject: string;
    id: string;
    createdOn: number | null;
    submittedBy: string;
    candidates: ICandidate[];
}

const initialState: IAddNewTopicSlice = {
    subject: '',
    id: '',
    createdOn: null,
    submittedBy: '',
    candidates: [],
};

export const addNewTopicThunk = createAsyncThunk('addNewTopic', async (data, { getState }) => {
    const {
        user: { userDetails },
    } = getState() as RootState;

    console.log(userDetails);
});

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
});

export const { ADD_CANDIDATE, DELETE_CANDIDATE } = addNewTopicSlice.actions;

export default addNewTopicSlice.reducer;
