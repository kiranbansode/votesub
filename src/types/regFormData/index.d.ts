type UserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

type BasicUserDetails = {
    name: UserName;
    gender: string;
    countryCode: string;
    mob1: string;
    emailId: string;
    password: string;
    confirmPassword: string;
};

export interface IStudentRegForm extends BasicUserDetails {
    dob?: string;
    schoolName?: string;
    std?: string;
    div?: string;
}

export interface ITeacherRegForm extends BasicUserDetails {
    schoolName?: string;
    role?: string;
}

export interface IEmployerRegForm extends BasicUserDetails {
    companyName?: string;
    role?: string;
}

export interface IDeveloperRegForm extends BasicUserDetails {
    companyName?: string;
    role?: string;
}
