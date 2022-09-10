import { useForm, FieldValues } from 'react-hook-form';
import TextInputField from 'components/TextInputField';
import SelectInputField from 'components/SelectInputField';
import { standardOptions } from 'utils/menuOptions/standards';
import { divisionOptions } from 'utils/menuOptions/divisions';
import DateInputField from 'components/DateInputField';
import RadioInputField from 'components/RadioInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';

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
                    options={standardOptions}
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
