import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

interface ICandidate {
    id: string;
    candidateName: string;
}

interface IAddNewTopicSlice {
    topicName: string;
    id: string;
    createdOn: number | null;
    submittedBy: string;
    candidates: ICandidate[];
}

const initialState: IAddNewTopicSlice = {
    topicName: '',
    id: '',
    createdOn: null,
    submittedBy: '',
    candidates: [],
};

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
                return {
                    payload: {
                        id,
                        candidateName: candidate,
                    },
                };
            },
        },
    },
});

export const { ADD_CANDIDATE } = addNewTopicSlice.actions;

export default addNewTopicSlice.reducer;
