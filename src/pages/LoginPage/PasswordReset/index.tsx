import { TextInputField } from 'components/InputFields';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RESET_PASSWORD_RESET_SLICE, passwordResetThunk } from 'store/loginPage/passwordResetSlice';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import Button from 'components/UI/Button';
import Logo from 'components/UI/Logo';
import Caption from 'components/UI/Caption';
import ErrorView from 'components/UI/ErrorView';
import BackdropMssg from 'components/UI/BackdropMssg';

import './Password.styles.scss';
import { useEffect } from 'react';

interface IPasswordResetPageForm {
    emailId: string;
}

const passwordResetPageFormValues: IPasswordResetPageForm = {
    emailId: '',
};

const PasswordResetPage = () => {
    const { control, handleSubmit, formState } = useForm<IPasswordResetPageForm>({
        defaultValues: passwordResetPageFormValues,
    });
    const passwordResetSlice = useAppSelector(({ passwordReset }) => passwordReset);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const ShowErrorInfo = () =>
        passwordResetSlice.error.code ? (
            <ErrorView
                errorTitle={passwordResetSlice.error.code}
                // @ts-ignore
                mssg="Email ID not found. User might be deleted or wrong E-mail ID was entered"
            />
        ) : null;

    const ShowInfoMssg = () =>
        passwordResetSlice.res?.status ? (
            <BackdropMssg
                footer="Redirecting to Login page"
                header="Success"
                // @ts-ignore
                mssg={passwordResetSlice.res.mssg}
                open={Boolean(passwordResetSlice.res.status)}
                type="success"
            />
        ) : null;

    useEffect(() => {
        if (passwordResetSlice.res.status) {
            setTimeout(() => {
                dispatch(RESET_PASSWORD_RESET_SLICE());
                navigate('/');
            }, 5000);
        }
    }, [passwordResetSlice.res.status]);

    return (
        <div className="registration-form__container" id="password-reset__page">
            <Logo goHere="/" />

            <Caption />

            <form
                className="dark_shadow"
                onSubmit={handleSubmit(({ emailId }) => {
                    dispatch(RESET_PASSWORD_RESET_SLICE());
                    dispatch(passwordResetThunk(emailId));
                })}
            >
                <TextInputField
                    autoFocus
                    required
                    separateLabel
                    control={control}
                    fieldName="emailId"
                    inputErrors={formState.errors}
                    inputHelperText="Enter your registered E-mail ID"
                    inputLabel="Email ID"
                />

                <ShowErrorInfo />

                <Button color="primary" loading={passwordResetSlice.loading} type="submit">
                    Submit
                </Button>
            </form>
            <ShowInfoMssg />
        </div>
    );
};

export default PasswordResetPage;
