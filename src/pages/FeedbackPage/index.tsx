import Header from 'components/Header';
import SliderInputField from 'components/SliderInputField';
import Button from 'components/Button';
import { FieldValues, useForm } from 'react-hook-form';
import './FeedbackPage.styles.scss';

interface IFeedbackPageForm {
    ui: number;
}

const feedbackPageFormDefaultValues: IFeedbackPageForm = {
    ui: 0,
};

const FeedbackPage = () => {
    const { control, handleSubmit } = useForm<FieldValues>({
        defaultValues: feedbackPageFormDefaultValues,
    });

    return (
        <div className="page" id="feedback-page">
            <Header />
            <div className="feedback-page__view">
                <h2 className="feedback-page__title">Feedback Page</h2>

                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <SliderInputField
                        separateLabel
                        control={control}
                        fieldName="ui"
                        inputLabel="User Interface [UI]"
                        marks={[
                            { value: 0, label: '0' },
                            { value: 1, label: '1' },
                            { value: 2, label: '2' },
                            { value: 3, label: '3' },
                            { value: 4, label: '4' },
                            { value: 5, label: '5' },
                        ]}
                        max={5}
                        min={0}
                        step={1}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackPage;
