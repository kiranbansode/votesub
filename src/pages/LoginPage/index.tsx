/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import { CircularProgress } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { userLogIn, RESET_AUTH_DETAILS } from 'store/loginPage/userLoginSlice';
import { SHOW_SIGN_IN_SUCCESS_POP_UP } from 'store/ui';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import BackdropMssg from 'components/BackdropMssg';
import InputFieldWrapper from 'styled/InputFieldWrapper';

// @ts-ignore
import loginPageFormValidation from './yupValidation.ts';
import './LoginPage.styles.scss';

const TextInputField = lazy(() => import('components/TextInputField'));
const PasswordInputField = lazy(() => import('components/PasswordInputField'));
const Button = lazy(() => import('components/Button'));
const Separator = lazy(() => import('components/Separator'));
const Logo = lazy(() => import('components/Logo'));
const Caption = lazy(() => import('components/Caption'));

export type UserLoginFormTypes = {
    username: string;
    password: string;
};

const loginPageFormDefaultValues: UserLoginFormTypes = {
    username: '',
    password: '',
};

const LoginPage = () => {
    const { register, handleSubmit, formState } = useForm<FieldValues>({
        defaultValues: loginPageFormDefaultValues,
        resolver: yupResolver(loginPageFormValidation),
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const userState = useAppSelector(({ user }) => user);
    const globalUI = useAppSelector((state) => state.ui);

    /**
     * Whenever user come back to Login page all auth states will reset.
     * e.g. previously failed login attempts, error mssg
     */
    useEffect(() => {
        dispatch(RESET_AUTH_DETAILS());
    }, []);

    useEffect(() => {
        if (userState.userDetails.uid) {
            dispatch(SHOW_SIGN_IN_SUCCESS_POP_UP());
            setTimeout(() => navigate('/dashboard'), 2000);
        }
    }, [userState.userDetails.uid]);

    const showErrorMssg = userState.error.code ? (
        <InputFieldWrapper>
            <Alert severity="error" variant="filled">
                <AlertTitle>{userState.error.code.toUpperCase()}</AlertTitle>
                {userState.error.message}
            </Alert>
        </InputFieldWrapper>
    ) : null;

    const showLoginSuccessMssg = globalUI.showSignSuccessPopUp ? (
        <BackdropMssg
            header="Login Successful."
            mssg="Redirecting to Dashboard..."
            open={globalUI.showSignSuccessPopUp}
        />
    ) : null;

    return (
        <div className="reg-form" id="login-page">
            <Logo goHere="/" />

            <Caption />

            <form onSubmit={handleSubmit((data) => dispatch(userLogIn(data)))}>
                <TextInputField
                    autoFocus
                    separateLabel
                    errors={formState.errors}
                    formRegister={register('username')}
                    inputLabel="Username"
                />

                <PasswordInputField
                    separateLabel
                    errors={formState.errors}
                    formRegister={register('password')}
                    inputLabel="Password"
                />

                {/* If there is any error mssg from auth, it should show here, right under password field */}
                {showErrorMssg}

                <Button className="login-button" loading={userState.loading} type="submit">
                    Login
                </Button>

                <Separator />

                <p>
                    Don&#39;t have an account ? Click on &nbsp;
                    <span className="register-link" onClick={() => navigate('/register')}>
                        Register
                    </span>
                    &nbsp; button below
                </p>

                <Button color="success" onClick={() => navigate('/register')}>
                    Register
                </Button>
            </form>

            {/* if user is able to login, then a success type mssg will be shown */}
            {showLoginSuccessMssg}
        </div>
    );

    //  : (
    //     <div
    //         style={{
    //             display: 'flex',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             height: '100vh',
    //         }}
    //     >
    //         <CircularProgress color="warning" />
    //     </div>
    // );
};

export default LoginPage;
