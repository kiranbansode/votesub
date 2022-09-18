import { lazy, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { SAVE_USER_ROLE } from 'store/registrationPage/saveuserRoleSlice';

import './RegistrationPage.styles.scss';

const Button = lazy(() => import('components/Button'));
const RadioInputField = lazy(() => import('components/RadioInputField'));
const Separator = lazy(() => import('components/Separator'));
const Logo = lazy(() => import('components/Logo'));
const Caption = lazy(() => import('components/Caption'));

const registrationFormValidation = yup.object({
    role: yup
        .string()
        .strict()
        .trim()
        .required(
            'Please choose your role so we can navigate you to appropriate Registration Form',
        ),
});

const REGISTRATION_FORM_DEFAULT_VALUE = {
    role: '',
};

const RegistrationPage = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: REGISTRATION_FORM_DEFAULT_VALUE,
        resolver: yupResolver(registrationFormValidation),
    });
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const userRole = useAppSelector((state) => state.userRole.role);

    const REG_NESTED_ROUTES = {
        st: 'student',
        tr: 'teacher',
        hr: 'employer',
        dev: 'developer',
    };

    useEffect(() => {
        if (userRole) {
            navigate(
                `${location.pathname}/${
                    REG_NESTED_ROUTES[userRole as keyof typeof REG_NESTED_ROUTES]
                }`,
            );
        }
    }, [userRole]);

    return (
        <div className="reg-form" id="registration-page">
            <Logo goHere="/" />

            <Caption />

            <h1 className="page-title">Register Now</h1>

            <Separator />

            <form
                onSubmit={handleSubmit((data) => {
                    dispatch(SAVE_USER_ROLE(data));
                })}
            >
                <RadioInputField
                    required
                    showBorder
                    control={control}
                    fieldName="role"
                    inputErrors={errors}
                    inputHelperText="We need to know Who are you ?, So we can navigate you to appropriate Registration Form."
                    inputLabel="Who are you ?"
                    radioSelect={[
                        { label: 'Student', value: 'st' },
                        { label: 'Teacher, Principal, Clerk, ...', value: 'tr' },
                        { label: 'Employer, HR, Manager, ...', value: 'hr' },
                        { label: 'SDE, UI-UX Designer, DevOps, ...', value: 'dev' },
                    ]}
                />

                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default RegistrationPage;
