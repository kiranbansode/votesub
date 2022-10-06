import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInputField from 'components/TextInputField';
import SelectInputField from 'components/SelectInputField';
import devOptions from 'utils/menuOptions/developer';
import RadioInputField from 'components/RadioInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';
import Logo from 'components/Logo';
import Caption from 'components/Caption';
import { IDeveloperRegForm } from 'types/regFormData';

// eslint-disable-next-line import/extensions
import DeveloperRegFormValidations from './yupValidations';

import './DeveloperRegForm.styles.scss';

const defaultDeveloperRegFormVal: IDeveloperRegForm = {
    name: {
        firstName: '',
        middleName: '',
        lastName: '',
    },
    gender: 'male',
    companyName: '',
    role: '',
    mob1: '',
    mob2: '',
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
        resolver: yupResolver(DeveloperRegFormValidations),
    });

    return (
        <div className="reg-form" id="developer-reg-form">
            <Logo goHere="/" />

            <Caption />

            <form onSubmit={handleSubmit((formData) => console.log(formData))}>
                <TextInputField
                    required
                    separateLabel
                    errors={errors}
                    formRegister={register('name.firstName')}
                    inputLabel="First Name"
                    inputPlaceholder="Your Name"
                />

                <TextInputField
                    required
                    separateLabel
                    errors={errors}
                    formRegister={register('name.middleName')}
                    inputLabel="Middle Name"
                    inputPlaceholder="Father/Husband Name"
                />

                <TextInputField
                    required
                    separateLabel
                    errors={errors}
                    formRegister={register('name.lastName')}
                    inputLabel="Last Name"
                    inputPlaceholder="Surname"
                />

                <RadioInputField
                    alignCenter
                    required
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

                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('companyName')}
                    inputLabel="Company Name"
                />

                <SelectInputField
                    required
                    separateLabel
                    control={control}
                    fieldName="role"
                    inputErrors={errors}
                    inputLabel="Your role in Company"
                    options={devOptions}
                />

                <TextInputField
                    required
                    separateLabel
                    errors={errors}
                    formRegister={register('mob1')}
                    inputLabel="Mobile No."
                />

                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('mob2')}
                    inputLabel="Alternate Mobile No."
                />

                <TextInputField
                    required
                    separateLabel
                    errors={errors}
                    formRegister={register('emailId')}
                    inputLabel="Email ID"
                />

                <PasswordInputField
                    required
                    separateLabel
                    errors={errors}
                    formRegister={register('password')}
                    inputLabel="Password"
                />

                <PasswordInputField
                    required
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
