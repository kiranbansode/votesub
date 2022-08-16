import { useForm } from 'react-hook-form';
import TextInputField from 'components/TextInputField';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { ADD_CANDIDATE } from 'store/addNewTopic';
import Header from 'components/Header';
import Button from 'components/Button';
import PageTitle from 'components/Title';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Separator from 'components/Separator';

import './AddNewTopicPage.styles.scss';

const AddNewTopicPage = () => {
    const {
        register,
        watch,
        resetField,
        setFocus,
        formState: { errors },
    } = useForm();
    const dispatch = useAppDispatch();
    const addNewTopicState = useAppSelector(({ addNewTopic }) => addNewTopic);

    return (
        <div id="add-new-topic-page">
            <Header />

            <PageTitle title="Add New Topic" />

            <Separator />

            <form className="form">
                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('topicName')}
                    inputHelperText="Make sure you submit small and expressive topic name"
                    inputLabel="Enter topic name for voting"
                    inputPlaceholder="Example: Favourite Fast Food ?"
                />

                {addNewTopicState.candidates.map((candidate, index) => (
                    <div className="candidate-container" key={candidate.id}>
                        <span className="candidate-position">{index + 1}</span>
                        <p className="candidate-name">{candidate.candidateName}</p>
                        <span className="edit-button">
                            <EditIcon fontSize="small" />
                        </span>
                        <span className="delete-button">
                            <DeleteIcon fontSize="small" />
                        </span>
                    </div>
                ))}

                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('candidateName')}
                    inputLabel="Candidate Name"
                />

                <Button
                    onClick={() => {
                        dispatch(ADD_CANDIDATE(watch('candidateName')));
                        setFocus('candidateName', { shouldSelect: true });
                        resetField('candidateName');
                    }}
                >
                    Add
                </Button>
            </form>
        </div>
    );
};

export default AddNewTopicPage;
