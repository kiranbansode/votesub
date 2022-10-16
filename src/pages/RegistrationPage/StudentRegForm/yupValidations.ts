import * as yup from 'yup';

const StudentRegFormValidations = yup.object({
    name: yup.object({
        firstName: yup.string().strict().trim().required('First name is required'),
        middleName: yup.string().strict().trim().required(),
        lastName: yup.string().strict().trim().required(),
    }),
    gender: yup.string().strict().trim().required(),
    dob: yup.date().required(),
    schoolName: yup.string().strict().trim().required(),
    std: yup.string().strict().trim().required(),
    div: yup.string().strict().trim().required(),
    mob1: yup.string().strict().trim().required(),
    mob2: yup.string().strict().trim(),
    emailId: yup.string().strict().trim().email().required(),
    password: yup
        .string()
        .strict()
        .trim()
        .required('Please Enter your password')
        .matches(
            // eslint-disable-next-line no-useless-escape
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            'Must Contain minimum 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
        ),
    confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref('password'), null], 'Password does not match'),
});

export default StudentRegFormValidations;
