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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Separator from 'components/Separator';

import './AddNewTopicPage.styles.scss';

const yupValidation = yup.object({
    topicName: yup.string().trim().strict().required('Topic is required'),
    candidateName: yup.string().trim().strict().required('Candidate is required'),
});

const defaultValues = {
    topicName: '',
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
    } = useForm<FieldValues>({
        defaultValues,
        resolver: yupResolver(yupValidation),
    });
    const dispatch = useAppDispatch();
    const addNewTopicState = useAppSelector(({ addNewTopic }) => addNewTopic);

    const editButtonHandler = (id: string) => {
        const candidateToEdit = addNewTopicState.candidates.filter(
            (candidate) => candidate.id === id,
        );

        resetField('candidateName', { defaultValue: candidateToEdit[0].candidateName });
        dispatch(DELETE_CANDIDATE(id));
    };

    const addCandidateButtonHandler = () => {
        const candidateName = watch('candidateName');
        if (!candidateName) {
            setError('candidateName', { type: 'custom', message: 'Please enter a Candidate Name' });
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

            <form className="form">
                <TextInputField
                    separateLabel
                    errors={formState.errors}
                    formRegister={register('topicName')}
                    inputHelperText="Make sure you submit small and expressive topic name"
                    inputLabel="Enter topic name for voting"
                    inputPlaceholder="Example: Favourite Fast Food ?"
                />

                {addNewTopicState.candidates.map((candidate, index) => (
                    <div className="candidate-container" key={candidate.id}>
                        <span className="candidate-position">{index + 1}</span>
                        <p className="candidate-name">{candidate.candidateName}</p>
                        <span
                            className="edit-button"
                            onClick={() => editButtonHandler(candidate.id)}
                        >
                            <EditIcon fontSize="small" />
                        </span>
                        <span
                            className="delete-button"
                            onClick={() => dispatch(DELETE_CANDIDATE(candidate.id))}
                        >
                            <DeleteIcon fontSize="small" />
                        </span>
                    </div>
                ))}

                <TextInputField
                    separateLabel
                    errors={formState.errors}
                    formRegister={register('candidateName')}
                    inputLabel="Candidate Name"
                />

                <Button onClick={() => addCandidateButtonHandler()}>Add Candidate</Button>
            </form>
        </div>
    );
};

export default AddNewTopicPage;
