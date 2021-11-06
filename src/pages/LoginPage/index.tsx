import { useForm } from 'react-hook-form';

import TextInputField from 'components/TextInputField';
import PasswordInputField from 'components/PasswordInputField';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div id="login-page">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <TextInputField useFormRegister={register('username')} />

        <PasswordInputField useFormRegister={register('password')} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
