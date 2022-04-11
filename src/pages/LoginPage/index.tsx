import { Link } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import useAppDisparch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import TextInputField from 'components/TextInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';
import Separator from 'components/Separator';
import { userLogIn } from 'store/loginPage/userLoginSlice';

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

const LoginPage = () => {
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: loginPageFormDefaultValues,
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
          inputLabel="Username"
          useFormRegister={register('username')}
        />

        <PasswordInputField
          separateLabel
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
