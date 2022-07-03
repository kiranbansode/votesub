import { useEffect, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAppDisparch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { userLogIn } from 'store/loginPage/userLoginSlice';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
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
    const dispatch = useAppDisparch();
    const navigate = useNavigate();
    const userState = useAppSelector(({ user }) => user);

    useEffect(() => {
        if (userState.userDetails.uid) {
            navigate('/dashboard');
        }
    }, [userState.userDetails.uid]);

    return (
        <div className="page" id="login-page">
            <Logo />

            <Caption />

            {/* @ts-ignore */}
            <form onSubmit={handleSubmit((data: UserLoginFormTypes) => dispatch(userLogIn(data)))}>
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

                {userState.error.code ? (
                    <InputFieldWrapper>
                        <Alert severity="error" variant="filled">
                            <AlertTitle>{userState.error.code.toUpperCase()}</AlertTitle>
                            {userState.error.message}
                        </Alert>
                    </InputFieldWrapper>
                ) : null}

                <Button className="login-button" loading={userState.loading} type="submit">
                    Login
                </Button>

                <Separator />

                <p>
                    Don&#39;t have an account ? Click on
                    {/* TODO: Find alternative way to remove default link style like blue underline */}
                    <Link style={{ textDecoration: 'none' }} to="/register">
                        <span className="register-link"> Register </span>
                    </Link>
                    button below
                </p>

                <Link style={{ textDecoration: 'none' }} to="/register">
                    <Button color="success">Register</Button>
                </Link>
            </form>
        </div>
    );
};

export default LoginPage;
