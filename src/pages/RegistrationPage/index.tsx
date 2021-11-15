import { useForm } from 'react-hook-form';

import TextInputField from 'components/TextInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';
import Logo from 'components/Logo';

const RegistrationPage = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Logo />
        <TextInputField useFormRegister={register('schoolName')} />

        <TextInputField useFormRegister={register('mobileNo')} />

        <TextInputField useFormRegister={register('altMobileNo')} />

        <TextInputField useFormRegister={register('emailId')} />

        <PasswordInputField useFormRegister={register('password')} />

        <PasswordInputField useFormRegister={register('confirmPassword')} />

        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default RegistrationPage;
