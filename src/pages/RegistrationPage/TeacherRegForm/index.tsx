import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInputField from 'components/TextInputField';
import RadioInputField from 'components/RadioInputField';
import PasswordInputField from 'components/PasswordInputField';
import SelectInputField from 'components/SelectInputField';
import Button from 'components/Button';
import Caption from 'components/Caption';
import Logo from 'components/Logo';
import useAppDispatch from 'hooks/useAppDispatch';
import {
    createNewUserThunk,
    RESET_REGISTRATION_SLICE,
} from 'store/registrationPage/createNewUserSlice';
import { ITeacherRegForm } from 'types/regFormData';
import countryCodeOptions from 'utils/menuOptions/countryCodes';
import useAppSelector from 'hooks/useAppSelector';
import ErrorView from 'components/Error';
import BackdropMssg from 'components/BackdropMssg';

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
    countryCode: '',
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
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const registrationSlice = useAppSelector(({ registration }) => registration);
    const userRole = useAppSelector((state) => state.userRole.role);

    const showErrorMssg = registrationSlice.error.code ? (
        <ErrorView errorTitle={registrationSlice.error.code} mssg={registrationSlice.error.mssg!} />
    ) : null;

    const showLoginSuccessMssg = registrationSlice.data?.uid ? (
        <BackdropMssg
            header="Registration Successful."
            mssg="Redirecting to Login page"
            open={!!registrationSlice.data?.uid}
        />
    ) : null;

    useEffect(() => {
        if (!userRole) {
            navigate('/register');
        }
    }, []);

    useEffect(() => {
        if (registrationSlice.data?.uid) {
            setTimeout(() => navigate('/'), 2000);
        }

        return () => {
            setTimeout(() => dispatch(RESET_REGISTRATION_SLICE()), 2000);
        };
    }, [registrationSlice.data?.uid]);

    return (
        <div className="reg-form" id="teacher-reg-form">
            <div className="page-view">
                <Logo goHere="/" />

                <Caption />

                <form onSubmit={handleSubmit((formData) => dispatch(createNewUserThunk(formData)))}>
                    <TextInputField
                        required
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
                        required
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

                    <SelectInputField
                        required
                        separateLabel
                        control={control}
                        fieldName="countryCode"
                        inputErrors={errors}
                        inputHelperText="It is required by E.164 standards"
                        inputLabel="Country Code"
                        options={countryCodeOptions}
                    />

                    <TextInputField
                        required
                        separateLabel
                        errors={errors}
                        formRegister={register('mob1')}
                        inputHelperText="A valid phone number will help us and you to reset your password"
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

                    {showErrorMssg}

                    <Button loading={registrationSlice.loading} type="submit">
                        Submit
                    </Button>

                    {showLoginSuccessMssg}
                </form>
            </div>
        </div>
    );
};

export default TeacherRegForm;
