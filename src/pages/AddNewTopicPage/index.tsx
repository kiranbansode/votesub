import { useForm } from 'react-hook-form';
import TextInputField from 'components/TextInputField';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { ADD_CANDIDATE } from 'store/addNewTopic';
import Header from 'components/Header';
import Button from 'components/Button';
import PageTitle from 'components/Title';

import './AddNewTopicPage.styles.scss';
import Separator from 'components/Separator';

const AddNewTopicPage = () => {
    const {
        register,
        watch,
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
                    <div key={candidate.id}>
                        <span>{index + 1}</span>
                        <p>{candidate.candidateName}</p>
                    </div>
                ))}

                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('candidateName')}
                    inputLabel="Candidate Name"
                />

                <Button onClick={() => dispatch(ADD_CANDIDATE(watch('candidateName')))}>Add</Button>
            </form>
        </div>
    );
};

export default AddNewTopicPage;
