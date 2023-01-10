import * as yup from 'yup';

const TeacherRegFormValidations = yup.object({
    name: yup.object({
        firstName: yup.string().strict().trim().required('First Name is required'),
        middleName: yup.string().strict().trim(),
        lastName: yup.string().strict().trim().required('Last Name is required'),
    }),
    gender: yup.string().strict().trim().required(),
    schoolName: yup.string().strict().trim(),
    role: yup.string().strict().trim().required(),
    countryCode: yup.string().strict().trim().required('We require your country code'),
    mob1: yup.string().strict().trim().required('We require a valid phone number'),
    mob2: yup.string().strict().trim(),
    emailId: yup.string().strict().trim().email().required('Email ID is required'),
    password: yup
        .string()
        .strict()
        .trim()
        .required('Enter your password')
        .matches(
            // eslint-disable-next-line no-useless-escape
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            'Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
        ),
    confirmPassword: yup
        .string()
        .required('Confirm your password')
        .oneOf([yup.ref('password'), null], 'Password does not match'),
});

export default TeacherRegFormValidations;
