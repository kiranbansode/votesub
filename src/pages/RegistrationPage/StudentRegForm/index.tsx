/**
 * @author: Kiran A. Bansode <czar.kiran@gmail.com> <kiran5120135@gmail.com>
 */

/* -------------------------------- Libraries ------------------------------- */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

/* ------------------------------- Components ------------------------------- */
import TextInputField from 'components/InputFields/TextInputField';
import SelectInputField from 'components/InputFields/SelectInputField';
import RadioInputField from 'components/InputFields/RadioInputField';
import PasswordInputField from 'components/InputFields/PasswordInputField';
import Button from 'components/Button';
import Logo from 'components/Logo';
import Caption from 'components/Caption';
import ErrorView from 'components/ErrorView';

/* ---------------------------------- Hooks --------------------------------- */
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

/* ---------------------------------- Redux --------------------------------- */
import {
    createNewUserThunk,
    RESET_REGISTRATION_SLICE,
} from 'store/registrationPage/createNewUserSlice';

/* ---------------------------------- Utils --------------------------------- */
import standardOptions from 'utils/menuOptions/standards';
import divisionOptions from 'utils/menuOptions/divisions';
import countryCodeOptions from 'utils/menuOptions/countryCodes';
import { IStudentRegForm } from 'types/regFormData';
import BackdropMssg from 'components/BackdropMssg';

// eslint-disable-next-line import/extensions
import StudentRegFormValidations from './yupValidations';

/* --------------------------------- Styles --------------------------------- */
import './StudentRegForm.styles.scss';

const defaultStudentRegFormVal: IStudentRegForm = {
    name: {
        firstName: '',
        middleName: '',
        lastName: '',
    },
    gender: 'male',
    schoolName: '',
    std: '',
    div: '',
    countryCode: '',
    mob1: '',
    mob2: '',
    emailId: '',
    password: '',
    confirmPassword: '',
};

const StudentRegForm = () => {
    const { control, formState, handleSubmit } = useForm<FieldValues>({
        defaultValues: defaultStudentRegFormVal,
        resolver: yupResolver(StudentRegFormValidations),
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
        <div className="reg-form" id="student-reg-form">
            <div className="page-view">
                <Logo goHere="/" />

                <Caption />

                <form
                    className="student-reg__form"
                    onSubmit={handleSubmit((formData) => {
                        dispatch(createNewUserThunk(formData));
                    })}
                >
                    <TextInputField
                        required
                        separateLabel
                        control={control}
                        inputErrors={formState.errors}
                        fieldName="name.firstName"
                        inputLabel="First Name"
                        inputPlaceholder="Your Name"
                    />

                    <TextInputField
                        separateLabel
                        control={control}
                        inputErrors={formState.errors}
                        fieldName="name.middleName"
                        inputLabel="Middle Name"
                        inputPlaceholder="Father/Husband Name"
                    />

                    <TextInputField
                        required
                        separateLabel
                        control={control}
                        inputErrors={formState.errors}
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
                        inputErrors={formState.errors}
                        fieldName="schoolName"
                        inputLabel="School Name"
                    />

                    <SelectInputField
                        separateLabel
                        control={control}
                        fieldName="std"
                        inputErrors={formState.errors}
                        inputLabel="Standard"
                        options={standardOptions}
                    />

                    <SelectInputField
                        separateLabel
                        control={control}
                        fieldName="div"
                        inputErrors={formState.errors}
                        inputLabel="Division"
                        options={divisionOptions}
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
                        inputErrors={formState.errors}
                        fieldName="mob1"
                        inputHelperText="A valid phone number will help us and you to reset your password"
                        inputLabel="Mobile No."
                    />

                    <TextInputField
                        separateLabel
                        control={control}
                        inputErrors={formState.errors}
                        fieldName="mob2"
                        inputLabel="Alternate Mobile No."
                    />

                    <TextInputField
                        required
                        separateLabel
                        control={control}
                        inputErrors={formState.errors}
                        fieldName="emailId"
                        inputLabel="Email ID"
                    />

                    <PasswordInputField
                        required
                        separateLabel
                        control={control}
                        inputErrors={formState.errors}
                        fieldName="password"
                        inputLabel="Password"
                    />

                    <PasswordInputField
                        required
                        separateLabel
                        control={control}
                        inputErrors={formState.errors}
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

export default StudentRegForm;
