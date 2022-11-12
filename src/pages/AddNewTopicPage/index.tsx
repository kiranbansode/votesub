/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInputField from 'components/TextInputField';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import {
    addNewTopicThunk,
    ADD_CANDIDATE,
    DELETE_CANDIDATE,
    RESET_SUBJECT,
} from 'store/addNewTopic';
import Header from 'components/Header';
import Button from 'components/Button';
import PageTitle from 'components/Title';
import Separator from 'components/Separator';
import NewCandidate from 'components/NewCandidate';

import './AddNewTopicPage.styles.scss';
import { useEffect } from 'react';

const yupValidation = yup.object({
    subject: yup.string().trim().strict().required('Subject is required'),
    candidateName: yup.string().trim().strict(),
});

const defaultValues = {
    subject: '',
    candidateName: '',
};

const AddNewTopicPage = () => {
    const {
        register,
        watch,
        resetField,
        // setFocus,
        setError,
        formState,
        handleSubmit,
    } = useForm<FieldValues>({
        defaultValues,
        resolver: yupResolver(yupValidation),
    });
    const dispatch = useAppDispatch();
    const addNewTopicState = useAppSelector(({ addNewTopic }) => addNewTopic);

    const editBtnHandler = (id: string) => {
        const candidateToEdit = addNewTopicState.candidates.filter(
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
    };

    useEffect(() => {
        dispatch(RESET_SUBJECT());
    }, []);

    return (
        <div id="add-new-topic-page">
            <Header />

            <PageTitle title="Add New Topic" />

            <Separator />

            <form
                className="form"
                onSubmit={handleSubmit((data) => {
                    dispatch(addNewTopicThunk(data));
                })}
            >
                {/* First Child */}
                <TextInputField
                    separateLabel
                    errors={formState.errors}
                    formRegister={register('subject')}
                    inputHelperText="Try to submit small and expressive subject for voting"
                    inputLabel="Enter a subject for voting"
                    inputPlaceholder="Favorite Fast Food ?"
                />

                {/* Second Child */}
                <TextInputField
                    separateLabel
                    errors={formState.errors}
                    formRegister={register('candidateName', {
                        required: addNewTopicState.candidates.length > 0,
                    })}
                    inputHelperText="Minimum 2 Candidates should be there for voting"
                    inputLabel="Candidate Name"
                />

                {/* Third Child */}
                <Button onClick={() => addCandidateBtnHandler()}>Add Candidate</Button>

                <p className="add-new-subject__info">
                    If you add more than 3 candidates you will get Metals Ranking System for your
                    subject
                </p>

                {addNewTopicState.candidates.length > 0 ? (
                    <p className="candidates-list">-x- Candidates List -x-</p>
                ) : null}

                {addNewTopicState.candidates.map((candidate, idx) => (
                    <NewCandidate
                        editBtnHandler={editBtnHandler}
                        idx={idx}
                        key={candidate.id}
                        newCandidate={candidate}
                    />
                ))}

                {/* Fourth Child */}
                <Button
                    color="warning"
                    type="button"
                    onClick={() => {
                        resetField('candidateName', { defaultValue: '' });
                        resetField('subject', { defaultValue: '' });
                        dispatch(RESET_SUBJECT());
                    }}
                >
                    Reset
                </Button>

                {/* Fifth Child */}
                <Button
                    color="success"
                    disabled={Boolean(!(addNewTopicState.candidates.length > 1))}
                    loading={addNewTopicState.loading}
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default AddNewTopicPage;
