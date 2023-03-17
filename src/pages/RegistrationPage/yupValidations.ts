import * as yup from 'yup';

const registrationFormValidation = yup.object({
    category: yup
        .string()
        .strict()
        .trim()
        .required(
            'Please choose your category so we can navigate you to appropriate Registration Form',
        ),
});

export default registrationFormValidation;
