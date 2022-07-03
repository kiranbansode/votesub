import * as yup from 'yup';
import yupValidate from 'utils/yupValidations';

const registrationFormValidation = yup.object({
    emailId: yupValidate.email,
    password: yupValidate.password,
    confirmPassword: yupValidate.confirmPassword,
});

export default registrationFormValidation;
