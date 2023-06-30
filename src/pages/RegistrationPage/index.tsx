import { lazy, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { RESET_USER_ROLE, SAVE_USER_ROLE } from 'store/registrationPage/saveUserRoleSlice';
// eslint-disable-next-line import/extensions
import registrationFormValidation from './yupValidations';

import './RegistrationPage.styles.scss';

const Button = lazy(() => import('components/UI/Button'));
const RadioInputField = lazy(() => import('components/InputFields/RadioInputField'));
const Logo = lazy(() => import('components/UI/Logo'));
const Caption = lazy(() => import('components/UI/Caption'));

type TRegForm = {
    category: string;
};

const REGISTRATION_FORM_DEFAULT_VALUE: TRegForm = {
    category: '',
};

const RegistrationPage = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TRegForm>({
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
        <div className="registration-form__container" id="registration-page">
            <Logo goHere="/" />

            <Caption />

            <form
                className="dark_shadow"
                onSubmit={handleSubmit((data) => {
                    dispatch(SAVE_USER_ROLE(data));
                    setNavigateUserToForm(true);
                })}
            >
                <RadioInputField
                    required
                    showBorder
                    showVertically
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
    );
};

export default RegistrationPage;
