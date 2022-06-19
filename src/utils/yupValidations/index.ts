import * as yup from 'yup';

const yupValidate = {
    email: yup
        .string()
        .trim()
        .strict()
        .email('Email ID is invalid')
        .max(255)
        .required('Email ID is required'),
    password: yup
        .string()
        .required('Password is required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16})/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
        ),
    confirmPassword: yup
        .string()
        .required('Confirm your password')
        .oneOf([yup.ref('password'), null], 'Password does not match'),
};

export default yupValidate;
