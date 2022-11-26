import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { nanoid } from 'nanoid';
import { addNewSubjectCLF } from 'config/firebase';
import { ICandidate } from 'types/addNewSubject';

interface IResponseFromAddNewSubjectCLF {
    subjectId: string;
    sub: number;
    candidates: number[];
}

interface IAddNewTopicSlice {
    subject: string;
    id: string;
    candidates: ICandidate[];
    loading: boolean;
    error: boolean | null;
    res: IResponseFromAddNewSubjectCLF | null;
}

const initialState: IAddNewTopicSlice = {
    id: '',
    subject: '',
    candidates: [],
    loading: false,
    error: null,
    res: null,
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

            return res.data;
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
                // const candidateName = toProperCase(candidate);
                const candidateName = candidate;

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

        RESET_ADD_NEW_SUBJECT_SLICE: (state) => {
            state.id = initialState.id;
            state.subject = initialState.subject;
            state.candidates = initialState.candidates;
            state.loading = initialState.loading;
            state.error = initialState.error;
            state.res = initialState.res;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(addNewTopicThunk.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(addNewTopicThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = false;
            state.res = action.payload;
        });

        builder.addCase(addNewTopicThunk.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { ADD_CANDIDATE, DELETE_CANDIDATE, RESET_ADD_NEW_SUBJECT_SLICE } =
    addNewTopicSlice.actions;

export default addNewTopicSlice.reducer;
