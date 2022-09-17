import * as yup from 'yup';

const EmployerRegFormValidations = yup.object({
    name: yup.object({
        firstname: yup.string().strict().trim().required('First name is required'),
        middlename: yup.string().strict().trim().required(),
        lastname: yup.string().strict().trim().required(),
    }),
    gender: yup.string().strict().trim().required(),
    companyName: yup.string().strict().trim(),
    role: yup.string().strict().trim(),
    mobileNo: yup.string().strict().trim().required(),
    altMobileNo: yup.string().strict().trim(),
    emailId: yup.string().strict().trim().email().required(),
    password: yup
        .string()
        .strict()
        .trim()
        .required('Please Enter your password')
        .matches(
            // eslint-disable-next-line no-useless-escape
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            'Must Contain atleast 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
        ),
    confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref('password'), null], 'Password does not match'),
});

export default EmployerRegFormValidations;
