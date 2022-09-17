import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInputField from 'components/TextInputField';
import RadioInputField from 'components/RadioInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';
import Caption from 'components/Caption';
import Logo from 'components/Logo';

// eslint-disable-next-line import/extensions
import TeacherRegFormValidations from './yupValidations';

import './TeacherRegForm.styles.scss';

const defaultTeacherRegFormVal = {
    name: {
        firstname: '',
        middlename: '',
        lastname: '',
    },
    gender: 'male',
    schoolname: '',
    mobileNo: '',
    altMobileNo: '',
    emailId: '',
    password: '',
    confirmPassword: '',
};

const TeacherRegForm = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<FieldValues>({
        defaultValues: defaultTeacherRegFormVal,
        resolver: yupResolver(TeacherRegFormValidations),
    });

    return (
        <div className="reg-form" id="teacher-reg-form">
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

                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('schoolname')}
                    inputLabel="School Name"
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

export default TeacherRegForm;
