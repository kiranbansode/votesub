import { useForm } from 'react-hook-form';
import useAppDisparch from 'hooks/useAppDispatch';

import TextInputField from 'components/TextInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';
import Separator from 'components/Separator';
import { userLogIn } from 'store/loginPage/userLoginSlice';

import './LoginPage.styles.scss';
import Logo from 'components/Logo';
import Caption from 'components/Caption';

export type userLoginFormTypes = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDisparch();

  return (
    <div className="page" id="login-page">
      <form onSubmit={handleSubmit((data: userLoginFormTypes) => dispatch(userLogIn(data)))}>
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

        <Button className="login-button" type="submit">
          Login
        </Button>

        <Separator />

        <p>
          Don&#39;t have an account? Click on <span className="register-link">Register</span> button
          below
        </p>

        <Button color="success">Register</Button>
      </form>
    </div>
  );
};

export default LoginPage;
