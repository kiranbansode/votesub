import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInputField from 'components/TextInputField';
import RadioInputField from 'components/RadioInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';
import Caption from 'components/Caption';
import Logo from 'components/Logo';
import useAppDispatch from 'hooks/useAppDispatch';
import { createNewUserThunk } from 'store/registrationPage/createNewUserSlice';
import { ITeacherRegForm } from 'types/regFormData';

// eslint-disable-next-line import/extensions
import TeacherRegFormValidations from './yupValidations';

import './TeacherRegForm.styles.scss';

const defaultTeacherRegFormVal: ITeacherRegForm = {
    name: {
        firstName: '',
        middleName: '',
        lastName: '',
    },
    gender: 'male',
    schoolName: '',
    mob1: '',
    mob2: '',
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
    const dispatch = useAppDispatch();

    return (
        <div className="reg-form" id="teacher-reg-form">
            <Logo goHere="/" />

            <Caption />

            <form onSubmit={handleSubmit((formData) => dispatch(createNewUserThunk(formData)))}>
                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('name.firstName')}
                    inputLabel="First Name"
                    inputPlaceholder="Your Name"
                />

                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('name.middleName')}
                    inputLabel="Middle Name"
                    inputPlaceholder="Father/Husband Name"
                />

                <TextInputField
                    separateLabel
                    errors={errors}
                    formRegister={register('name.lastName')}
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
                    formRegister={register('schoolName')}
                    inputHelperText="Enter name of school where do you work."
                    inputLabel="School Name"
                />

                <TextInputField
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
