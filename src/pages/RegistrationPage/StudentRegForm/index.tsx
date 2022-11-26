/**
 * @author: Kiran A. Bansode <czar.kiran@gmail.com> <kiran5120135@gmail.com>
 */

/* -------------------------------- Libraries ------------------------------- */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

/* ------------------------------- Components ------------------------------- */
import TextInputField from 'components/TextInputField';
import SelectInputField from 'components/SelectInputField';
// import DateInputField from 'components/DateInputField';
import RadioInputField from 'components/RadioInputField';
import PasswordInputField from 'components/PasswordInputField';
import Button from 'components/Button';
import Logo from 'components/Logo';
import Caption from 'components/Caption';
import ErrorView from 'components/Error';

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
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<FieldValues>({
        defaultValues: defaultStudentRegFormVal,
        resolver: yupResolver(StudentRegFormValidations),
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
        <div className="reg-form" id="student-reg-form">
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
                    formRegister={register('schoolName')}
                    inputLabel="School Name"
                />

                <SelectInputField
                    separateLabel
                    control={control}
                    fieldName="std"
                    inputErrors={errors}
                    inputLabel="Standard"
                    options={standardOptions}
                />

                <SelectInputField
                    separateLabel
                    control={control}
                    fieldName="div"
                    inputErrors={errors}
                    inputLabel="Division"
                    options={divisionOptions}
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
    );
};

export default StudentRegForm;
