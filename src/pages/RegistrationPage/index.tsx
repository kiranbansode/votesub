import { lazy, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { RESET_USER_ROLE, SAVE_USER_ROLE } from 'store/registrationPage/saveUserRoleSlice';

import './RegistrationPage.styles.scss';

const Button = lazy(() => import('components/Button'));
const RadioInputField = lazy(() => import('components/RadioInputField'));
const Logo = lazy(() => import('components/Logo'));
const Caption = lazy(() => import('components/Caption'));

const registrationFormValidation = yup.object({
    category: yup
        .string()
        .strict()
        .trim()
        .required(
            'Please choose your category so we can navigate you to appropriate Registration Form',
        ),
});

const REGISTRATION_FORM_DEFAULT_VALUE = {
    category: '',
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
    const dispatch = useAppDispatch();
    const location = useLocation();
    const userCategory = useAppSelector((state) => state.userCategory.category);
    const [navigateUserToForm, setNavigateUserToForm] = useState(false);

    const REG_NESTED_ROUTES = {
        st: 'student',
        tr: 'teacher',
        hr: 'employer',
        dev: 'developer',
    };

    useEffect(() => {
        dispatch(RESET_USER_ROLE());
    }, []);

    useEffect(() => {
        if (navigateUserToForm) {
            navigate(
                `${location.pathname}/${
                    REG_NESTED_ROUTES[userCategory as keyof typeof REG_NESTED_ROUTES]
                }`,
            );
        }
    }, [navigateUserToForm]);

    return (
        <div className="reg-form" id="registration-page">
            <div className="page-view">
                <Logo goHere="/" />

                <Caption />

                <form
                    className="registration-page__form"
                    onSubmit={handleSubmit((data) => {
                        dispatch(SAVE_USER_ROLE(data));
                        setNavigateUserToForm(true);
                    })}
                >
                    <RadioInputField
                        required
                        showBorder
                        control={control}
                        fieldName="category"
                        inputErrors={errors}
                        inputHelperText="We need to know who you are, so we can navigate you to appropriate Registration Form."
                        inputLabel="Who are you ?"
                        radioSelect={[
                            { label: 'Student', value: 'st' },
                            { label: 'Teacher, Principal, Clerk, ...', value: 'tr' },
                            { label: 'Employer, HR, Manager, ...', value: 'hr' },
                            { label: 'SDE, UI-UX Designer, ...', value: 'dev' },
                        ]}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;
