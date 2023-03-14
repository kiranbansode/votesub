import * as yup from 'yup';
import yupValidations from 'utils/yupValidations';

const DeveloperRegFormValidations = yup.object({
    name: yup.object({
        firstName: yupValidations.firstName,
        middleName: yupValidations.middleName,
        lastName: yupValidations.lastName,
    }),
    gender: yupValidations.gender,
    companyName: yupValidations.companyName,
    role: yupValidations.role,
    countryCode: yupValidations.countryCode,
    mob1: yupValidations.mob1,
    emailId: yupValidations.emailId,
    password: yupValidations.password,
    confirmPassword: yupValidations.confirmPassword,
});

export default DeveloperRegFormValidations;
