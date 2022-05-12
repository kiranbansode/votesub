import { Link } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import useAppDisparch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import TextInputField from 'components/TextInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';
import Separator from 'components/Separator';
import { userLogIn } from 'store/loginPage/userLoginSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './LoginPage.styles.scss';
import Logo from 'components/Logo';
import Caption from 'components/Caption';

export type UserLoginFormTypes = {
  username: string;
  password: string;
};

const loginPageFormDefaultValues: UserLoginFormTypes = {
  username: '',
  password: '',
};

const loginPageFormValidation = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const LoginPage = () => {
  const { register, handleSubmit, formState } = useForm<FieldValues>({
    defaultValues: loginPageFormDefaultValues,
    resolver: yupResolver(loginPageFormValidation),
  });
  const dispatch = useAppDisparch();
  const userState = useAppSelector(({ user }) => user);

  return (
    <div className="page" id="login-page">
      <form onSubmit={handleSubmit((data: UserLoginFormTypes) => dispatch(userLogIn(data)))}>
        <Logo />

        <Caption />

        <TextInputField
          autoFocus
          separateLabel
          errors={formState.errors}
          inputLabel="Username"
          useFormRegister={register('username')}
        />

        <PasswordInputField
          separateLabel
          errors={formState.errors}
          inputLabel="Password"
          useFormRegister={register('password')}
        />

        <Button className="login-button" loading={userState.loading} type="submit">
          Login
        </Button>

        <Separator />

        <p>
          Don&#39;t have an account? Click on <span className="register-link">Register</span> button
          below
        </p>

        <Link to="/register">
          <Button color="success">Register</Button>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
