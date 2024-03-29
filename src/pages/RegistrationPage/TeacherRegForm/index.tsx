import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInputField from 'components/InputFields/TextInputField';
import RadioInputField from 'components/InputFields/RadioInputField';
import PasswordInputField from 'components/InputFields/PasswordInputField';
import SelectInputField from 'components/InputFields/SelectInputField';
import Button from 'components/UI/Button';
import Caption from 'components/UI/Caption';
import Logo from 'components/UI/Logo';
import useAppDispatch from 'hooks/useAppDispatch';
import {
    createNewUserThunk,
    RESET_REGISTRATION_SLICE,
} from 'store/registrationPage/createNewUserSlice';
import { ITeacherRegForm } from 'types/regFormData';
import countryCodeOptions from 'utils/menuOptions/countryCodes';
import useAppSelector from 'hooks/useAppSelector';
import ErrorView from 'components/UI/ErrorView';
import BackdropMssg from 'components/UI/BackdropMssg';
import trOptions from 'utils/menuOptions/tr';
import { SAVE_USER_AUTH_DETAILS } from 'store/loginPage/userLoginSlice';

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
    role: '',
    countryCode: '',
    mob1: '',
    emailId: '',
    password: '',
    confirmPassword: '',
};

const TeacherRegForm = () => {
    const { control, formState, handleSubmit, watch, setValue } = useForm<ITeacherRegForm>({
        defaultValues: defaultTeacherRegFormVal,
        resolver: yupResolver(TeacherRegFormValidations),
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const registrationSlice = useAppSelector(({ registration }) => registration);
    const authObj = registrationSlice.data;
    const userCategory = useAppSelector((state) => state.userCategory.category);
    const selectedCountryCode = watch('countryCode');

    const ShowErrorMssg = () =>
        registrationSlice.error.code ? (
            <ErrorView
                errorTitle={registrationSlice.error.code}
                mssg={registrationSlice.error.mssg!}
            />
        ) : null;

    const ShowLoginSuccessMssg = () =>
        registrationSlice.data?.uid ? (
            <BackdropMssg
                header="Registration Successful."
                mssg="Redirecting to Dashboard page"
                open={!!registrationSlice.data?.uid}
                type="success"
            />
        ) : null;

    useEffect(() => {
        if (selectedCountryCode) {
            setValue('mob1', selectedCountryCode);
        }
    }, [selectedCountryCode]);

    useEffect(() => {
        if (!userCategory) {
            navigate('/register');
        }
    }, []);

    useEffect(() => {
        if (registrationSlice.data?.uid) {
            dispatch(SAVE_USER_AUTH_DETAILS(authObj));
            setTimeout(() => navigate('/dashboard'), 2000);
        }

        return () => {
            setTimeout(() => dispatch(RESET_REGISTRATION_SLICE()), 2000);
        };
    }, [registrationSlice.data?.uid]);

    return (
        <div className="registration-form__container" id="teacher-reg__page">
            <Logo goHere="/" />

            <Caption />

            <form
                className="dark_shadow"
                onSubmit={handleSubmit((formData) => {
                    dispatch(createNewUserThunk(formData));
                })}
            >
                <TextInputField
                    required
                    separateLabel
                    control={control}
                    fieldName="name.firstName"
                    inputErrors={formState.errors}
                    inputLabel="First Name"
                    inputPlaceholder="Your Name"
                />

                <TextInputField
                    separateLabel
                    control={control}
                    fieldName="name.middleName"
                    inputErrors={formState.errors}
                    inputLabel="Middle Name"
                    inputPlaceholder="Father/Husband Name"
                />

                <TextInputField
                    required
                    separateLabel
                    control={control}
                    fieldName="name.lastName"
                    inputErrors={formState.errors}
                    inputLabel="Last Name"
                    inputPlaceholder="Surname"
                />

                <RadioInputField
                    alignCenter
                    separateLabel
                    showBorder
                    control={control}
                    fieldName="gender"
                    inputErrors={formState.errors}
                    inputLabel="Gender"
                    radioSelect={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                    ]}
                />

                <TextInputField
                    separateLabel
                    control={control}
                    fieldName="schoolName"
                    inputErrors={formState.errors}
                    inputHelperText="Enter name of school where do you work."
                    inputLabel="School Name"
                />

                <SelectInputField
                    required
                    separateLabel
                    control={control}
                    fieldName="role"
                    inputErrors={formState.errors}
                    inputHelperText="It is required to generate role for Profile"
                    inputLabel="Your Role in School"
                    options={trOptions}
                />

                <SelectInputField
                    required
                    separateLabel
                    control={control}
                    fieldName="countryCode"
                    inputErrors={formState.errors}
                    inputHelperText="It is required by E.164 standards"
                    inputLabel="Country Code"
                    options={countryCodeOptions}
                />

                <TextInputField
                    required
                    separateLabel
                    control={control}
                    fieldName="mob1"
                    inputErrors={formState.errors}
                    inputHelperText="A valid phone number will help us and you to reset your password"
                    inputLabel="Mobile No."
                />

                <TextInputField
                    required
                    separateLabel
                    control={control}
                    fieldName="emailId"
                    inputErrors={formState.errors}
                    inputLabel="Email ID"
                />

                <PasswordInputField
                    required
                    separateLabel
                    control={control}
                    fieldName="password"
                    inputErrors={formState.errors}
                    inputLabel="Password"
                />

                <PasswordInputField
                    required
                    separateLabel
                    control={control}
                    fieldName="confirmPassword"
                    inputErrors={formState.errors}
                    inputLabel="Confirm Password"
                />

                <ShowErrorMssg />

                <Button loading={registrationSlice.loading} type="submit">
                    Submit
                </Button>
            </form>

            <ShowLoginSuccessMssg />
        </div>
    );
};

export default TeacherRegForm;
