/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInputField from 'components/TextInputField';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { ADD_CANDIDATE, DELETE_CANDIDATE } from 'store/addNewTopic';
import Header from 'components/Header';
import Button from 'components/Button';
import PageTitle from 'components/Title';
import Separator from 'components/Separator';
import NewCandidate from 'components/NewCandidate';

import './AddNewTopicPage.styles.scss';

const yupValidation = yup.object({
    subject: yup.string().trim().strict().required('Subject is required'),
    candidateName: yup.string().trim().strict().required('Candidate is required'),
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
                { type: 'custom', message: 'Please enter a Candidate Name' },
                { shouldFocus: true },
            );
            return;
        }

        dispatch(ADD_CANDIDATE(candidateName));
        resetField('candidateName', { defaultValue: '' });
    };

    return (
        <div id="add-new-topic-page">
            <Header />

            <PageTitle title="Add New Topic" />

            <Separator />

            <form
                className="form"
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                })}
            >
                <TextInputField
                    separateLabel
                    errors={formState.errors}
                    formRegister={register('subject')}
                    inputHelperText="Try to submit small and expressive subject for voting"
                    inputLabel="Enter a subject for voting"
                    inputPlaceholder="Favourite Fast Food ?"
                />

                <TextInputField
                    separateLabel
                    errors={formState.errors}
                    formRegister={register('candidateName')}
                    inputLabel="Candidate Name"
                />

                <Button onClick={() => addCandidateBtnHandler()}>Add Candidate</Button>

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

                <Button color="success" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default AddNewTopicPage;
