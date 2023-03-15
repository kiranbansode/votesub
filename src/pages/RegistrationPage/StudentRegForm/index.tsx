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
import Button from 'components/UI/Button';
import Logo from 'components/UI/Logo';
import Caption from 'components/UI/Caption';
import ErrorView from 'components/UI/ErrorView';

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
import BackdropMssg from 'components/UI/BackdropMssg';
import { SAVE_USER_AUTH_DETAILS } from 'store/loginPage/userLoginSlice';

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
    const authObj = registrationSlice.data;
    const userCategory = useAppSelector((state) => state.userCategory.category);

    const ShowErrorMssg = () =>
        registrationSlice.error.code ? (
            <ErrorView
                errorTitle={registrationSlice.error.code}
                mssg={registrationSlice.error.mssg!}
            />
        ) : null;

    const ShowRegisterSuccessMssg = () =>
        registrationSlice.data?.uid ? (
            <BackdropMssg
                header="Registration Successful."
                mssg="Redirecting to Dashboard page"
                open={!!registrationSlice.data?.uid}
                type="success"
            />
        ) : null;

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
        <div className="registration-form__container" id="student-reg__page">
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
                    fieldName="schoolName"
                    inputErrors={formState.errors}
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

            <ShowRegisterSuccessMssg />
        </div>
    );
};

export default StudentRegForm;
