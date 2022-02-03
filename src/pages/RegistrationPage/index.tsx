import { useForm } from 'react-hook-form';

import TextInputField from 'components/TextInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';

import './RegistrationPage.styles.scss';

const RegistrationPage = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div className="page" id="registration-page">
      <h1>Register Now</h1>
      <hr />

      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <TextInputField
          autoFocus
          separateLabel
          inputLabel="Name"
          inputPlaceHolder="Your Name"
          useFormRegister={register('name.firstName')}
        />

        <TextInputField
          noLabel
          inputPlaceHolder="Father/Husband Name"
          useFormRegister={register('name.middleName')}
        />

        <TextInputField
          noLabel
          inputPlaceHolder="Surname"
          useFormRegister={register('name.lastName')}
        />

        <TextInputField
          separateLabel
          inputLabel="School Name"
          useFormRegister={register('schoolName')}
        />

        <TextInputField
          separateLabel
          inputLabel="Mobile No. (WhatsApp)"
          useFormRegister={register('mobileNo')}
        />

        <TextInputField
          separateLabel
          inputLabel="Alternate Mobile No."
          useFormRegister={register('altMobileNo')}
        />

        <TextInputField separateLabel inputLabel="Email ID" useFormRegister={register('emailId')} />

        <PasswordInputField useFormRegister={register('password')} />

        <PasswordInputField useFormRegister={register('confirmPassword')} />

        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default RegistrationPage;
