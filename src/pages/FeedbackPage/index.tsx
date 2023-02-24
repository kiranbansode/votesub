import Header from 'components/layouts/Header';
import SliderInputField from 'components/InputFields/SliderInputField';
import Button from 'components/UI/Button';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PageTitle from 'components/UI/Title';
// import PageNotFound from 'pages/PageNotFound';
import TextInputField from 'components/InputFields/TextInputField';
import RadioInputField from 'components/InputFields/RadioInputField';

import './FeedbackPage.styles.scss';
import { addNewFeedbackThunk } from 'store/addNewFeedback';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';

interface IFeedbackPageForm {
    ux: 'a' | 'b' | 'c' | 'd' | '';
    ui: 'a' | 'b' | 'c' | 'd' | '';
    performance: 'a' | 'b' | 'c' | 'd' | '';
    ratings: number;
    mssg: string;
}

const feedbackPageFormDefaultValues: IFeedbackPageForm = {
    ux: '',
    ui: '',
    performance: '',
    ratings: 0,
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
    ],
};

const FeedbackPageValidations = yup.object({
    ux: yup
        .string()
        .required(
            'Please! Choose a option as per your VoteSub experience. Your feedback is really important for me 😥',
        ),
    ui: yup
        .string()
        .required(
            'Please! Choose a option as per your VoteSub experience. Your feedback is really important for me 😥',
        ),
    performance: yup
        .string()
        .required(
            'Please! Choose a option as per your VoteSub experience. Your feedback is really important for me 😥',
        ),
    ratings: yup
        .number()
        .min(
            1,
            'Please! Give VoteSub a rating as per your experience. Your feedback is really important for me 😥.',
        )
        .max(5, 'Maximum allowed rating is 5')
        .required(
            'Please! Give us a rating as per your VoteSub experience. Your feedback is really important for me 😥',
        ),
    mssg: yup.string(),
});

const FeedbackPage = () => {
    const { control, handleSubmit, formState } = useForm<FieldValues>({
        defaultValues: feedbackPageFormDefaultValues,
        resolver: yupResolver(FeedbackPageValidations),
    });
    const dispatch = useAppDispatch();
    const addNewFeedbackState = useAppSelector((state) => state.addNewFeedback);

    return (
        <div className="page" id="feedback-page">
            <Header />
            <div className="feedback-page__view page-view">
                <PageTitle title="Feedback" />

                <form
                    onSubmit={handleSubmit((data) => {
                        /* @ts-ignore */
                        dispatch(addNewFeedbackThunk(data));
                    })}
                >
                    <RadioInputField
                        required
                        separateLabel
                        showBorder
                        showVertically
                        control={control}
                        fieldName="ux"
                        inputErrors={formState.errors}
                        inputLabel="1. Do you find it easy or difficult to navigate within VoteSub app ? (User-Experience)"
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
                        inputLabel="2. How does VoteSub app look ? (User-Interface)"
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
                        inputLabel="3. How does VoteSub app feel ? (Performance)"
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
                        fieldName="ratings"
                        inputErrors={formState.errors}
                        inputLabel="4. Based on your experience, How much you will rate the VoteSub app ?"
                        marks={marksForFeedbackPage[1]}
                        max={5}
                        min={0}
                        step={1}
                    />

                    <TextInputField
                        makeItTextArea
                        separateLabel
                        control={control}
                        fieldName="mssg"
                        inputErrors={formState.errors}
                        inputLabel="5. Any Message or Feedback to Developer regarding VoteSub app ?"
                        inputPlaceholder="Please enter your message or feedback here"
                    />

                    <Button loading={addNewFeedbackState.loading} type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackPage;
