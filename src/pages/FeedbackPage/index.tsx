import Header from 'components/Header';
import SliderInputField from 'components/SliderInputField';
import Button from 'components/Button';
import { FieldValues, useForm } from 'react-hook-form';
import PageTitle from 'components/Title';
// import PageNotFound from 'pages/PageNotFound';
import TextInputField from 'components/TextInputField';
import RadioInputField from 'components/RadioInputField';

import './FeedbackPage.styles.scss';

interface IFeedbackPageForm {
    ux: 'a' | 'b' | 'c' | 'd' | '';
    ui: 'a' | 'b' | 'c' | 'd' | '';
    performance: 'a' | 'b' | 'c' | 'd' | '';
    rating: number;
    mssg: string;
}

const feedbackPageFormDefaultValues: IFeedbackPageForm = {
    ux: '',
    ui: '',
    performance: '',
    rating: 0,
    mssg: '',
};

const marksForFeedbackPage = {
    1: [
        { value: 0, label: '0' },
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
        { value: 6, label: '6' },
        { value: 7, label: '7' },
        { value: 8, label: '8' },
        { value: 9, label: '9' },
        { value: 10, label: '10' },
    ],
};

const FeedbackPage = () => {
    const { control, register, handleSubmit, formState } = useForm<FieldValues>({
        defaultValues: feedbackPageFormDefaultValues,
    });

    return (
        <div className="page" id="feedback-page">
            <Header />
            <div className="feedback-page__view page-view">
                <PageTitle title="Feedback" />

                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <RadioInputField
                        required
                        separateLabel
                        showBorder
                        showVertically
                        control={control}
                        fieldName="ux"
                        inputErrors={formState.errors}
                        inputLabel="1. Do you find it easy or difficult to navigate ? (User-Experience)"
                        radioSelect={[
                            { label: 'Very Difficult', value: 'd' },
                            { label: 'Difficult', value: 'c' },
                            { label: 'Easy', value: 'b' },
                            { label: 'Easy-Peasy 😎', value: 'a' },
                        ]}
                    />

                    <RadioInputField
                        required
                        separateLabel
                        showBorder
                        showVertically
                        control={control}
                        fieldName="ui"
                        inputErrors={formState.errors}
                        inputLabel="2. How's the VoteSub look ? (User-Interface)"
                        radioSelect={[
                            { label: 'Very Bad', value: 'd' },
                            { label: 'Bad', value: 'c' },
                            { label: 'O.K.', value: 'b' },
                            { label: 'Nice One! 😘 ', value: 'a' },
                        ]}
                    />

                    <RadioInputField
                        required
                        separateLabel
                        showBorder
                        showVertically
                        control={control}
                        fieldName="performance"
                        inputErrors={formState.errors}
                        inputLabel="3. How's VoteSub feel ? (Performance)"
                        radioSelect={[
                            { label: 'Very Slow', value: 'd' },
                            { label: 'Slow', value: 'c' },
                            { label: 'Fast', value: 'b' },
                            { label: 'Very Fast 🏎️', value: 'a' },
                        ]}
                    />

                    <SliderInputField
                        required
                        separateLabel
                        showBorder
                        control={control}
                        fieldName="rating"
                        inputLabel="4. Based on your experience, how much you will rate the VoteSub ?"
                        marks={marksForFeedbackPage[1]}
                        max={10}
                        min={0}
                        step={1}
                    />

                    <TextInputField
                        changeToTextArea
                        separateLabel
                        errors={formState.errors}
                        formRegister={register('mssg')}
                        inputLabel="5. Any Message or Feedback to Developer ?"
                        inputPlaceholder="Please enter your message or feedback here"
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackPage;
