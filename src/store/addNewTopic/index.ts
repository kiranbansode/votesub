import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { nanoid } from 'nanoid';
import { addNewSubjectCLF } from 'config/firebase';
import toProperCase from 'utils/helperFunctions/toProperCase';
import { ICandidate } from 'types/addNewSubject';

interface IAddNewTopicSlice {
    subject: string;
    id: string;
    candidates: ICandidate[];
    loading: boolean;
    error: boolean | null;
}

const initialState: IAddNewTopicSlice = {
    subject: '',
    id: '',
    candidates: [],
    loading: false,
    error: null,
};

export const addNewTopicThunk = createAsyncThunk(
    'addNewTopic',
    async (
        /**
         * `formDate` -  `Add New Topic` page's form data
         *
         */
        formData: any,
        { getState, rejectWithValue },
    ) => {
        const {
            user: { userDetails },
            addNewTopic,
        } = getState() as RootState;
        const subjectId = nanoid();

        try {
            const res = await addNewSubjectCLF({
                id: subjectId,
                subjectName: formData.subject,
                submittedBy: userDetails.displayName,
                userId: userDetails.uid,
                candidates: addNewTopic.candidates,
            });

            return res;
        } catch (error) {
            return rejectWithValue(error);
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
            state.error = false;
        });

        builder.addCase(addNewTopicThunk.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { ADD_CANDIDATE, DELETE_CANDIDATE } = addNewTopicSlice.actions;

export default addNewTopicSlice.reducer;
