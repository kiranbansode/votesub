import { useForm } from 'react-hook-form';
import TextInputField from 'components/TextInputField';
import Header from 'components/Header';
import Button from 'components/Button';
import PageTitle from 'components/Title';

import './AddNewTopicPage.styles.scss';
import Separator from 'components/Separator';

const AddNewTopicPage = () => {
    const {
        register,
        formState: { errors },
    } = useForm();

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
                    inputLabel="Enter topic name for voting"
                />

                <Button>Save</Button>
            </form>
        </div>
    );
};

export default AddNewTopicPage;
