import { useForm, FieldValues } from 'react-hook-form';

import TextInputField from 'components/TextInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';
import RadioInputField from 'components/RadioInputField';

import './RegistrationPage.styles.scss';

const REGISTRATION_FORM_DEFAULT_VALUE = {
  name: {
    firstName: '',
    middleName: '',
    lastName: '',
  },
  gender: 'male',
  schoolName: '',
  mobileNo: '',
  altMobileNo: '',
  emailId: '',
  password: '',
  confirmPassword: '',
};

const RegistrationPage = () => {
  const { register, handleSubmit, control } = useForm<FieldValues>({
    defaultValues: REGISTRATION_FORM_DEFAULT_VALUE,
  });

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

        <RadioInputField fieldName="gender" inputLabel="Gender" useFormControl={control} />

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

        <PasswordInputField
          separateLabel
          inputLabel="Password"
          useFormRegister={register('password')}
        />

        <PasswordInputField
          separateLabel
          inputLabel="Confirm Your Password"
          useFormRegister={register('confirmPassword')}
        />

        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default RegistrationPage;
