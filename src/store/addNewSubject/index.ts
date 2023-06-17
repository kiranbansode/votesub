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

interface IAddNewSubjectSlice {
    subject: string;
    id: string;
    candidates: ICandidate[];
    loading: boolean;
    error: boolean | null;
    res: IResponseFromAddNewSubjectCLF | null;
}

const initialState: IAddNewSubjectSlice = {
    id: '',
    subject: '',
    candidates: [],
    loading: false,
    error: null,
    res: null,
};

export const addNewSubjectThunk = createAsyncThunk(
    'addNewSubject',
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
            addNewSubject,
        } = getState() as RootState;
        const subjectId = nanoid();

        try {
            const res = await addNewSubjectCLF({
                id: subjectId,
                subjectName: formData.subject,
                submittedBy: userDetails.displayName,
                userId: userDetails.uid,
                candidates: addNewSubject.candidates,
            });

            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

const addNewSubjectSlice = createSlice({
    name: 'addNewSubject',
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
        builder.addCase(addNewSubjectThunk.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(addNewSubjectThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = false;
            state.res = action.payload;
        });

        builder.addCase(addNewSubjectThunk.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { ADD_CANDIDATE, DELETE_CANDIDATE, RESET_ADD_NEW_SUBJECT_SLICE } =
    addNewSubjectSlice.actions;

export default addNewSubjectSlice.reducer;
