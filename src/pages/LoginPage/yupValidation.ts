import * as yup from 'yup';

const loginPageFormValidation = yup.object({
    username: yup
        .string()
        .strict()
        .trim('Blank Spaces are not allowed')
        .email('Username must be a valid Email ID')
        .max(255)
        .required('Username is required'),
    password: yup.string().strict().required('Password is required'),
});

export default loginPageFormValidation;
