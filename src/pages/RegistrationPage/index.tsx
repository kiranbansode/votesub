import { useForm, FieldValues } from 'react-hook-form';

import TextInputField from 'components/TextInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';
import RadioInputField from 'components/RadioInputField';
import DateInputField from 'components/DateInputField';

import './RegistrationPage.styles.scss';
import Separator from 'components/Separator';
import Logo from 'components/Logo';
import Caption from 'components/Caption';

const REGISTRATION_FORM_DEFAULT_VALUE = {
  name: {
    firstName: '',
    middleName: '',
    lastName: '',
  },
  gender: 'male',
  dob: '',
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
      <Logo />

      <Caption />

      <h1 className="page-title">Register Now</h1>

      <Separator />

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

        <DateInputField
          separateLabel
          inputLabel="Date of Birth"
          useFormRegister={register('dob')}
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
