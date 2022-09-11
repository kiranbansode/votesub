import { useForm, FieldValues } from 'react-hook-form';
import TextInputField from 'components/TextInputField';
import SelectInputField from 'components/SelectInputField';
import devOptions from 'utils/menuOptions/developer';
import RadioInputField from 'components/RadioInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';

const defaultDeveloperRegFormVal = {
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

const DeveloperRegForm = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<FieldValues>({
        defaultValues: defaultDeveloperRegFormVal,
    });

    return (
        <div className="reg-form" id="developer-reg-form">
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
                    options={devOptions}
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

export default DeveloperRegForm;
