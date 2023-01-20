import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInputField from 'components/TextInputField';
import SelectInputField from 'components/SelectInputField';
import hrOptions from 'utils/menuOptions/hr';
import RadioInputField from 'components/RadioInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';
import Logo from 'components/Logo';
import Caption from 'components/Caption';
import { IEmployerRegForm } from 'types/regFormData';
import countryCodeOptions from 'utils/menuOptions/countryCodes';
import useAppDispatch from 'hooks/useAppDispatch';
import {
    createNewUserThunk,
    RESET_REGISTRATION_SLICE,
} from 'store/registrationPage/createNewUserSlice';
import { useNavigate } from 'react-router-dom';
import useAppSelector from 'hooks/useAppSelector';
import ErrorView from 'components/Error';
import BackdropMssg from 'components/BackdropMssg';
import { useEffect } from 'react';

// eslint-disable-next-line import/extensions
import EmployerRegFormValidations from './yupValidations';

import './EmployerRegForm.styles.scss';

const defaultEmployerRegFormVal: IEmployerRegForm = {
    name: {
        firstName: '',
        middleName: '',
        lastName: '',
    },
    gender: 'male',
    companyName: '',
    role: '',
    countryCode: '',
    mob1: '',
    mob2: '',
    emailId: '',
    password: '',
    confirmPassword: '',
};

const EmployerRegForm = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<FieldValues>({
        defaultValues: defaultEmployerRegFormVal,
        resolver: yupResolver(EmployerRegFormValidations),
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const registrationSlice = useAppSelector(({ registration }) => registration);
    const userCategory = useAppSelector((state) => state.userCategory.category);

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
        if (!userCategory) {
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
        <div className="reg-form" id="employer-reg-form">
            <div className="page-view">
                <Logo goHere="/" />

                <Caption />

                <form
                    onSubmit={handleSubmit((formData) => {
                        dispatch(createNewUserThunk(formData));
                    })}
                >
                    <TextInputField
                        required
                        separateLabel
                        control={control}
                        errors={errors}
                        fieldName="name.firstName"
                        inputLabel="First Name"
                        inputPlaceholder="Your Name"
                    />

                    <TextInputField
                        separateLabel
                        control={control}
                        errors={errors}
                        fieldName="name.middleName"
                        inputLabel="Middle Name"
                        inputPlaceholder="Father/Husband Name"
                    />

                    <TextInputField
                        required
                        separateLabel
                        control={control}
                        errors={errors}
                        fieldName="name.lastName"
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
                        control={control}
                        errors={errors}
                        fieldName="companyName"
                        inputLabel="Company Name"
                    />

                    <SelectInputField
                        required
                        separateLabel
                        control={control}
                        fieldName="role"
                        inputErrors={errors}
                        inputLabel="Your role in Company"
                        options={hrOptions}
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
                        control={control}
                        errors={errors}
                        fieldName="mob1"
                        inputHelperText="A valid phone number will help us and you to reset your password"
                        inputLabel="Mobile No."
                    />

                    <TextInputField
                        separateLabel
                        control={control}
                        errors={errors}
                        fieldName="mob2"
                        inputLabel="Alternate Mobile No."
                    />

                    <TextInputField
                        required
                        separateLabel
                        control={control}
                        errors={errors}
                        fieldName="emailId"
                        inputLabel="Email ID"
                    />

                    <PasswordInputField
                        required
                        separateLabel
                        control={control}
                        errors={errors}
                        fieldName="password"
                        inputLabel="Password"
                    />

                    <PasswordInputField
                        required
                        separateLabel
                        control={control}
                        errors={errors}
                        fieldName="confirmPassword"
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

export default EmployerRegForm;
