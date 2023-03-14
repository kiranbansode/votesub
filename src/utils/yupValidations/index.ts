import * as yup from 'yup';
import validationsMessages from 'utils/yupValidations/validationsMssg';

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const yupValidations = {
    category: yup
        .string()
        .strict()
        .trim(validationsMessages.TRIM)
        .required(validationsMessages.CATEGORY),
    firstName: yup
        .string()
        .strict()
        .trim(validationsMessages.TRIM)
        .required(validationsMessages.FIRST_NAME),
    middleName: yup.string().strict().trim(validationsMessages.TRIM),
    lastName: yup
        .string()
        .strict()
        .trim(validationsMessages.TRIM)
        .required(validationsMessages.LAST_NAME),
    gender: yup
        .string()
        .strict()
        .trim(validationsMessages.TRIM)
        .required(validationsMessages.GENDER),
    schoolName: yup.string().strict().trim(validationsMessages.TRIM),
    companyName: yup.string().strict().trim(validationsMessages.TRIM),
    std: yup.string().strict().trim(validationsMessages.TRIM),
    div: yup.string().strict().trim(validationsMessages.TRIM),
    role: yup.string().strict().trim(validationsMessages.TRIM).required(validationsMessages.ROLE),
    mob1: yup
        .string()
        .strict()
        .trim(validationsMessages.TRIM)
        .matches(phoneRegExp, validationsMessages.MOBILE_NO_VALID)
        .required(validationsMessages.MOBILE_NO),
    countryCode: yup
        .string()
        .strict()
        .trim(validationsMessages.TRIM)
        .required(validationsMessages.COUNTRY_CODE),
    emailId: yup
        .string()
        .strict()
        .trim(validationsMessages.TRIM)
        .email(validationsMessages.EMAIL_ID_VALID)
        .required(validationsMessages.EMAIL_ID),
    password: yup
        .string()
        .strict()
        .trim(validationsMessages.TRIM)
        .required(validationsMessages.PASSWORD)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            validationsMessages.PASSWORD_REGEX,
        ),
    confirmPassword: yup
        .string()
        .required(validationsMessages.CONFIRM_PASSWORD)
        .oneOf([yup.ref('password'), null], validationsMessages.CONFIRM_PASSWORD_MATCH),
};

export default yupValidations;
