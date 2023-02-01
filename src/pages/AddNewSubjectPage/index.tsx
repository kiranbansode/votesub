/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInputField from 'components/TextInputField';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import {
    addNewSubjectThunk,
    ADD_CANDIDATE,
    DELETE_CANDIDATE,
    RESET_ADD_NEW_SUBJECT_SLICE,
} from 'store/addNewSubject';
import Header from 'components/Header';
import Button from 'components/Button';
import PageTitle from 'components/Title';
import NewCandidate from 'components/NewCandidate';

import './AddNewSubjectPage.styles.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import setInputFocusOn from 'utils/helperFunctions/setInputFocusOn';

const yupValidation = yup.object({
    subject: yup.string().trim().strict().required('Subject is required'),
    candidateName: yup.string().trim().strict(),
});

const defaultValues = {
    subject: '',
    candidateName: '',
};

const AddNewSubjectPage = () => {
    const { control, watch, resetField, setError, formState, handleSubmit } = useForm<FieldValues>({
        defaultValues,
        resolver: yupResolver(yupValidation),
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const addNewSubjectState = useAppSelector(({ addNewSubject }) => addNewSubject);
    const addNewSubjectRes = useAppSelector(({ addNewSubject }) => addNewSubject.res);

    const ShowCandidateListText = () =>
        addNewSubjectState.candidates.length > 0 ? (
            <p className="candidates-list">-x- Candidates List -x-</p>
        ) : null;

    const AddSubjectInfoText = () =>
        addNewSubjectState.candidates.length > 0 && addNewSubjectState.candidates.length < 2 ? (
            <p className="add-new-subject__info">
                Add one more candidate to activate Submit button
            </p>
        ) : null;

    const editBtnHandler = (id: string) => {
        const candidateToEdit = addNewSubjectState.candidates.filter(
            (candidate) => candidate.id === id,
        );

        resetField('candidateName', { defaultValue: candidateToEdit[0].candidateName });
        dispatch(DELETE_CANDIDATE(id));
    };

    const addCandidateBtnHandler = () => {
        const candidateName = watch('candidateName');
        if (!candidateName) {
            setError(
                'candidateName',
                { type: 'required', message: 'Please enter a Candidate Name' },
                { shouldFocus: true },
            );
            return;
        }
        dispatch(ADD_CANDIDATE(candidateName));
        resetField('candidateName', { defaultValue: '' });
        // setFocus('candidateName', { shouldSelect: true });
        setInputFocusOn('candidateName');
    };

    useEffect(() => {
        dispatch(RESET_ADD_NEW_SUBJECT_SLICE());
    }, []);

    useEffect(() => {
        if (addNewSubjectRes?.sub && addNewSubjectRes.candidates.length > 0) {
            navigate(`/dashboard/${addNewSubjectRes.subjectId}`);
        }

        return () => {
            dispatch(RESET_ADD_NEW_SUBJECT_SLICE());
        };
    }, [addNewSubjectRes?.subjectId]);

    return (
        <div id="add-new-subject-page">
            <Header />

            <div className="page-view">
                <PageTitle title="Add New Subject" />

                <form
                    className="form"
                    onSubmit={handleSubmit((formData) => {
                        dispatch(addNewSubjectThunk(formData));
                    })}
                >
                    {/* First Child */}
                    <TextInputField
                        separateLabel
                        control={control}
                        errors={formState.errors}
                        fieldName="subject"
                        inputHelperText="Try to use small and expressive name or question for Subject"
                        inputLabel="Enter a subject for voting"
                        inputPlaceholder="Favorite Fast Food ?"
                    />

                    {/* Second Child */}
                    <TextInputField
                        separateLabel
                        className="textInput-candidateName"
                        control={control}
                        errors={formState.errors}
                        fieldName="candidateName"
                        inputHelperText="Minimum 2 Candidates should be added so users can vote"
                        inputLabel="Candidate Name"
                        inputPlaceholder="Pizza 🍕"
                    />

                    {/* Third Child */}
                    <Button onClick={() => addCandidateBtnHandler()}>Add Candidate</Button>

                    <p className="add-new-subject__info">
                        If you add more than 3 candidates you will get Metal Ranking 🥇🥈🥉 system
                        for your voting subject
                    </p>

                    <ShowCandidateListText />

                    {addNewSubjectState.candidates.map((candidate, idx) => (
                        <NewCandidate
                            editBtnHandler={editBtnHandler}
                            indexNumber={idx}
                            key={candidate.id}
                            newCandidate={candidate}
                        />
                    ))}

                    <AddSubjectInfoText />

                    {/* 2nd Last Child */}
                    <Button
                        color="success"
                        disabled={Boolean(!(addNewSubjectState.candidates.length > 1))}
                        loading={addNewSubjectState.loading}
                        type="submit"
                    >
                        Submit
                    </Button>

                    {/* Last Child */}
                    <Button
                        color="warning"
                        type="button"
                        onClick={() => {
                            resetField('candidateName', { defaultValue: '' });
                            resetField('subject', { defaultValue: '' });
                            dispatch(RESET_ADD_NEW_SUBJECT_SLICE());
                        }}
                    >
                        Reset
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddNewSubjectPage;
