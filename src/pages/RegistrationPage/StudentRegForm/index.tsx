import { useForm, FieldValues } from 'react-hook-form';
import TextInputField from 'components/TextInputField';
import SelectInputField from 'components/SelectInputField';
import standardOptions from 'utils/menuOptions/standards';
import divisionOptions from 'utils/menuOptions/divisions';
import DateInputField from 'components/DateInputField';
import RadioInputField from 'components/RadioInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';
import Logo from 'components/Logo';
import Caption from 'components/Caption';

import './StudentRegForm.styles.scss';

const defaultStudentRegFormVal = {
    name: {
        firstname: '',
        middlename: '',
        lastname: '',
    },
    gender: 'male',
    dob: '',
    schoolname: '',
    std: '',
    div: '',
    mobileNo: '',
    altMobileNo: '',
    emailId: '',
    password: '',
    confirmPassword: '',
};

const StudentRegForm = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<FieldValues>({
        defaultValues: defaultStudentRegFormVal,
    });

    return (
        <div className="reg-form" id="student-reg-form">
            <Logo goHere="/" />

            <Caption />

            <form onSubmit={handleSubmit((data) => console.log(data))}>
                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('name.firstname')}
                    inputLabel="First Name"
                    inputPlaceholder="Your Name"
                />

                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('name.middlename')}
                    inputLabel="Middle Name"
                    inputPlaceholder="Father/Husband Name"
                />

                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('name.lastname')}
                    inputLabel="Last Name"
                    inputPlaceholder="Surname"
                />

                <RadioInputField
                    alignCenter
                    separateLabel
                    showBorder
                    control={control}
                    fieldName="gender"
                    inputErrors={errors}
                    inputLabel="Gender"
                    radioSelect={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                    ]}
                />

                <DateInputField
                    separateLabel
                    control={control}
                    fieldName="dob"
                    inputErrors={errors}
                    inputHelperText="Enter your Birthdate"
                    inputLabel="Date of Birth"
                />

                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('schoolname')}
                    inputLabel="School Name"
                />

                <SelectInputField
                    showSeparateLabel
                    control={control}
                    fieldName="std"
                    inputErrors={errors}
                    inputLabel="Standard"
                    options={standardOptions}
                />

                <SelectInputField
                    showSeparateLabel
                    control={control}
                    fieldName="div"
                    inputErrors={errors}
                    inputLabel="Division"
                    options={divisionOptions}
                />

                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('mobileNo')}
                    inputLabel="Mobile No. (WhatsApp)"
                />

                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('altMobileNo')}
                    inputLabel="Alternate Mobile No."
                />

                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('emailId')}
                    inputLabel="Email ID"
                />

                <PasswordInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('password')}
                    inputLabel="Password"
                />

                <PasswordInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('confirmPassword')}
                    inputLabel="Confirm Password"
                />

                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default StudentRegForm;
