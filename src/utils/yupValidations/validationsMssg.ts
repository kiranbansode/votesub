const validationsMessages = {
    /**
     * `CATEGORY`: Message for `category` required
     */
    CATEGORY: 'Please choose your category so we can navigate you to appropriate Registration Form',
    /**
     * `TRIM`: Message for yup.trim()
     *
     */
    TRIM: 'Empty spaces are not allowed. Please! Remove any empty space',
    /**
     * `FIRST_NAME`: Message for firstName required
     */
    FIRST_NAME: 'First Name is required. Please! Enter your First Name',
    /**
     * `MIDDLE_NAME`: Message for middleName required
     */
    MIDDLE_NAME: 'Middle Name is required. Please! Enter your Middle Name',
    /**
     * `LAST_NAME`: Message for lastName required
     */
    LAST_NAME: 'Last Name is required. Please! Enter your Last Name',
    /**
     * `GENDER`: Message for gender required
     */
    GENDER: 'Gender is required. Please! Select your Gender',

    /**
     * `COUNTRY_CODE`: Message for countryCode required
     */
    ROLE: 'Role is required. Please! Choose your role in your organization',

    /**
     * `COUNTRY_CODE`: Message for countryCode required
     */
    COUNTRY_CODE: 'Country Code is required. Please! Choose a Country Code as per your country',
    /**
     * `MOBILE_NO`: Message for required
     */
    MOBILE_NO: 'Mobile Number is required. Please! Enter a valid Mobile Number',
    /**
     * `MOBILE_NO`: Message for required
     */
    MOBILE_NO_VALID: 'Invalid Mobile Number is entered. Please! Enter a valid Mobile Number',
    /**
     * `MOBILE_NO`: Message for minimum allowed length
     */
    MOBILE_NO_MIN: "Minimum allowed Mobile Number length is 7 digits, excluding '+' sign",
    /**
     * `MOBILE_NO`: Message for maximum allowed length
     */
    MOBILE_NO_MAX: "Maximum allowed Mobile Number length is 15 digits, excluding '+' sign",

    /**
     * `EMAIL_ID`: Message for emailId required
     */
    EMAIL_ID: 'Email ID is required. Please! Enter a valid Email-ID',
    /**
     * `EMAIL_ID`: Message for emailId required
     */
    EMAIL_ID_VALID: 'Entered email id is not valid. Please! Enter a valid email id',
    /**
     * `PASSWORD`: Message for password required
     */
    PASSWORD: 'Password is required. Please! Enter a valid Password',
    /**
     * `PASSWORD_REGEX`: Message for password: yup.matches()
     */
    PASSWORD_REGEX:
        'Password should be minimum 8 Characters and it must contain One Uppercase, One Lowercase, One Number and One Special Case Character',
    /**
     * `CONFIRM_PASSWORD`: Message for confirmPassword required
     */
    CONFIRM_PASSWORD: 'Confirm Password is required. Please! Enter a valid password',
    /**
     * `CONFIRM_PASSWORD_MATCH`: Message for confirmPassword: yup.oneOf() required
     */
    CONFIRM_PASSWORD_MATCH:
        'Password and Confirm Password does not match. Please! Re-enter the password',
};

export default validationsMessages;
