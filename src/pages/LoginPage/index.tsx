/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import {
    userLogIn,
    RESET_AUTH_DETAILS,
    SAVE_USER_AUTH_DETAILS,
} from 'store/loginPage/userLoginSlice';
import { SHOW_SIGN_IN_SUCCESS_POP_UP } from 'store/ui';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import BackdropMssg from 'components/UI/BackdropMssg';
import InputFieldWrapper from 'styled/InputFieldWrapper';
import { TextInputField, PasswordInputField } from 'components/InputFields';

// @ts-ignore
import getLastVisitedRoute from 'utils/helperFunctions/getLastVisitedRoute.ts';

// @ts-ignore
import loginPageFormValidation from './yupValidation.ts';

import './LoginPage.styles.scss';

// const TextInputField = lazy(() => import('components/InputFields/TextInputField'));
// const PasswordInputField = lazy(() => import('components/InputFields/PasswordInputField'));
const Button = lazy(() => import('components/UI/Button'));
const Separator = lazy(() => import('components/UI/Separator'));
const Logo = lazy(() => import('components/UI/Logo'));
const Caption = lazy(() => import('components/UI/Caption'));

export type UserLoginFormTypes = {
    username: string;
    password: string;
};

const loginPageFormDefaultValues: UserLoginFormTypes = {
    username: '',
    password: '',
};

const LoginPage = () => {
    const { control, formState, handleSubmit } = useForm<UserLoginFormTypes>({
        defaultValues: loginPageFormDefaultValues,
        resolver: yupResolver(loginPageFormValidation),
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const lastVisitedRoute = getLastVisitedRoute();

    const userState = useAppSelector(({ user }) => user);
    const existingUser = useAppSelector(({ existingLoggedUserAuth }) => existingLoggedUserAuth);
    const globalUI = useAppSelector((state) => state.ui);

    const ShowErrorMssg = () =>
        userState.error.code ? (
            <InputFieldWrapper>
                <Alert severity="error" variant="filled">
                    <AlertTitle>{userState.error.code.toUpperCase()}</AlertTitle>
                    {userState.error.message}
                </Alert>
            </InputFieldWrapper>
        ) : null;

    const ShowLoginSuccessMssg = () =>
        globalUI.showSignSuccessPopUp ? (
            <BackdropMssg
                header="Login Successful."
                mssg="Redirecting to Dashboard..."
                open={globalUI.showSignSuccessPopUp}
                type="success"
            />
        ) : null;

    const ForgotPasswordText = () => (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <p className="login-page__forgot" onClick={() => navigate('/forgotPassword')}>
            Forgot Password?
        </p>
    );

    const RegisterText = () => (
        <p className="login-page__register">
            Don&#39;t have an account? Click on&nbsp;
            <span className="register-link" onClick={() => navigate('/register')}>
                Register
            </span>
        </p>
    );

    const Footer = () => (
        <div className="login-page__footer">
            <p className="message">Made with ❤️ By</p>
            <p className="name default_shadow">Kiran Bansode</p>
            <p className="version">-x- [23.01.10-2] -x-</p>
        </div>
    );

    /**
     * if user come back to Login page all auth states will reset.
     * e.g. previously failed login attempts, error mssg
     */
    useEffect(() => {
        if (!existingUser.allowUser) {
            dispatch(RESET_AUTH_DETAILS());
        }
    }, []);

    useEffect(() => {
        // @ts-ignore
        dispatch(SAVE_USER_AUTH_DETAILS(existingUser.userDetails));
    }, [existingUser.userDetails.uid]);

    useEffect(() => {
        if (lastVisitedRoute && lastVisitedRoute !== '/' && userState.userDetails.uid) {
            dispatch(SHOW_SIGN_IN_SUCCESS_POP_UP());
            setTimeout(() => navigate(lastVisitedRoute), 2000);
            return;
        }

        if (userState.userDetails.uid) {
            dispatch(SHOW_SIGN_IN_SUCCESS_POP_UP());
            setTimeout(() => navigate('/dashboard'), 2000);
        }
    }, [userState.userDetails.uid]);

    return (
        <div className="login-page" id="login-page">
            <Logo className="loginpage__logo" goHere="/" />

            <Caption />

            <form
                className="login-page__form dark_shadow"
                onSubmit={handleSubmit((formData) => dispatch(userLogIn(formData)))}
            >
                <TextInputField
                    autoFocus
                    required
                    separateLabel
                    control={control}
                    fieldName="username"
                    inputErrors={formState.errors}
                    inputLabel="Username"
                />

                <PasswordInputField
                    required
                    separateLabel
                    control={control}
                    fieldName="password"
                    inputErrors={formState.errors}
                    inputLabel="Password"
                />

                {/* If there is any error mssg from auth, it should show here, right under password field */}
                <ShowErrorMssg />

                <Button className="login-button" loading={userState.loading} type="submit">
                    Login
                </Button>

                <ForgotPasswordText />

                <Separator />

                <RegisterText />

                <Button color="success" onClick={() => navigate('/register')}>
                    Register
                </Button>
            </form>

            <Footer />

            {/* if user is able to login, then a success type mssg will be shown */}
            <ShowLoginSuccessMssg />
        </div>
    );
};

export default LoginPage;
