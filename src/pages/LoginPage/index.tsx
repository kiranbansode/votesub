import { useForm } from 'react-hook-form';

import TextInputField from 'components/TextInputField';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div id="login-page">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <TextInputField formRegister={register('username')} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
