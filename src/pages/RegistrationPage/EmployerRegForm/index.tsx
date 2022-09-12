import { useForm, FieldValues } from 'react-hook-form';
import TextInputField from 'components/TextInputField';
import SelectInputField from 'components/SelectInputField';
import hrOptions from 'utils/menuOptions/hr';
import RadioInputField from 'components/RadioInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';
import Logo from 'components/Logo';
import Caption from 'components/Caption';

import './EmployerRegForm.styles.scss';

const defaultEmployerRegFormVal = {
    name: {
        firstname: '',
        middlename: '',
        lastname: '',
    },
    gender: 'male',
    companyName: '',
    role: '',
    mobileNo: '',
    altMobileNo: '',
    emailId: '',
    password: '',
    confirmPassword: '',
};

const EmployerRegForm = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<FieldValues>({
        defaultValues: defaultEmployerRegFormVal,
    });

    return (
        <div className="reg-form" id="employer-reg-form">
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
                    separateLabel
                    control={control}
                    fieldName="gender"
                    inputErrors={errors}
                    inputLabel="Gender"
                    radioSelect={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                    ]}
                />

                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('companyName')}
                    inputLabel="Company Name"
                />

                <SelectInputField
                    showSeparateLabel
                    control={control}
                    fieldName="role"
                    inputErrors={errors}
                    inputLabel="Your role in Company"
                    options={hrOptions}
                />

                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('mobileNo')}
                    inputLabel="Mobile No."
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

export default EmployerRegForm;