import { lazy } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { standardOptions } from 'utils/menuOptions/standards';
import { divisionOptions } from 'utils/menuOptions/divisions';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { createNewUserThunk } from 'store/registrationPage/createNewUserSlice';

// @ts-ignore
import registrationFormValidation from './yupValidation.ts';
import './RegistrationPage.styles.scss';

const TextInputField = lazy(() => import('components/TextInputField'));
const PasswordInputField = lazy(() => import('components/PasswordInputField'));
const Button = lazy(() => import('components/Button'));
const RadioInputField = lazy(() => import('components/RadioInputField'));
const DateInputField = lazy(() => import('components/DateInputField'));
const SelectInputField = lazy(() => import('components/SelectInputField'));
const Separator = lazy(() => import('components/Separator'));
const Logo = lazy(() => import('components/Logo'));
const Caption = lazy(() => import('components/Caption'));

const REGISTRATION_FORM_DEFAULT_VALUE = {
    name: {
        firstName: '',
        middleName: '',
        lastName: '',
    },
    gender: 'male',
    dob: new Date(),
    schoolName: '',
    std: '',
    div: '',
    mobileNo: '',
    altMobileNo: '',
    emailId: '',
    password: '',
    confirmPassword: '',
};

const RegistrationPage = () => {
    const { register, handleSubmit, control, formState } = useForm<FieldValues>({
        defaultValues: REGISTRATION_FORM_DEFAULT_VALUE,
        resolver: yupResolver(registrationFormValidation),
    });

    const dispatch = useAppDispatch();
    const createNewUserState = useAppSelector((state) => state.registration);

    return (
        <div className="page" id="registration-page">
            <Logo />

            <Caption />

            <h1 className="page-title">Register Now</h1>

            <Separator />

            <form onSubmit={handleSubmit((data) => dispatch(createNewUserThunk(data)))}>
                <TextInputField
                    autoFocus
                    separateLabel
                    errors={formState.errors}
                    formRegister={register('name.firstName')}
                    inputLabel="Name"
                    inputPlaceholder="Your Name"
                />

                <TextInputField
                    noLabel
                    errors={formState.errors}
                    formRegister={register('name.middleName')}
                    inputPlaceholder="Father/Husband Name"
                />

                <TextInputField
                    noLabel
                    errors={formState.errors}
                    formRegister={register('name.lastName')}
                    inputPlaceholder="Surname"
                />

                <RadioInputField fieldName="gender" inputLabel="Gender" useFormControl={control} />

                <DateInputField
                    separateLabel
                    control={control}
                    fieldName="dob"
                    inputErrors={formState.errors}
                    inputLabel="Date of Birth"
                />

                <TextInputField
                    separateLabel
                    errors={formState.errors}
                    formRegister={register('schoolName')}
                    inputLabel="School Name"
                />

                <SelectInputField
                    showSeparateLabel
                    control={control}
                    fieldName="std"
                    inputErrors={formState.errors}
                    inputLabel="Standard"
                    options={standardOptions}
                />

                <SelectInputField
                    showSeparateLabel
                    control={control}
                    fieldName="div"
                    inputErrors={formState.errors}
                    inputLabel="Division"
                    options={divisionOptions}
                />

                <TextInputField
                    separateLabel
                    errors={formState.errors}
                    formRegister={register('mobileNo')}
                    inputLabel="Mobile No. (WhatsApp)"
                />

                <TextInputField
                    separateLabel
                    errors={formState.errors}
                    formRegister={register('altMobileNo')}
                    inputLabel="Alternate Mobile No."
                />

                <TextInputField
                    separateLabel
                    errors={formState.errors}
                    formRegister={register('emailId')}
                    inputLabel="Email ID"
                />

                <PasswordInputField
                    separateLabel
                    errors={formState.errors}
                    formRegister={register('password')}
                    inputLabel="Password"
                />

                <PasswordInputField
                    separateLabel
                    errors={formState.errors}
                    formRegister={register('confirmPassword')}
                    inputLabel="Confirm Your Password"
                />

                <Button loading={createNewUserState.loading} type="submit">
                    Register
                </Button>
            </form>
        </div>
    );
};

export default RegistrationPage;
