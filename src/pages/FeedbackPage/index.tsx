import Header from 'components/Header';
import SliderInputField from 'components/SliderInputField';
import Button from 'components/Button';
import { FieldValues, useForm } from 'react-hook-form';
import './FeedbackPage.styles.scss';
import PageTitle from 'components/Title';
import PageNotFound from 'pages/PageNotFound';

interface IFeedbackPageForm {
    ui: number;
    fast: number;
}

const feedbackPageFormDefaultValues: IFeedbackPageForm = {
    ui: 0,
    fast: 0,
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

const FeedbackPage = () => {
    const { control, handleSubmit } = useForm<FieldValues>({
        defaultValues: feedbackPageFormDefaultValues,
    });

    return (
        <PageNotFound
            code={503}
            mssg="The page you are looking for is under development. Please come back again after some time."
            title="Under Development"
        />
    );

    // return (
    //     <div className="page" id="feedback-page">
    //         <Header />
    //         <div className="feedback-page__view">
    //             <PageTitle title="Feedback" />

    //             <form onSubmit={handleSubmit((data) => console.log(data))}>
    //                 <SliderInputField
    //                     separateLabel
    //                     control={control}
    //                     fieldName="ui"
    //                     inputLabel="User Interface [UI]"
    //                     marks={marksForFeedbackPage[1]}
    //                     max={5}
    //                     min={0}
    //                     step={1}
    //                 />

    //                 <SliderInputField
    //                     separateLabel
    //                     control={control}
    //                     fieldName="fast"
    //                     inputLabel="How much fast is it [UI]"
    //                     marks={marksForFeedbackPage[1]}
    //                     max={5}
    //                     min={0}
    //                     step={1}
    //                 />
    //                 <Button type="submit">Submit</Button>
    //             </form>
    //         </div>
    //     </div>
    // );
};

export default FeedbackPage;
