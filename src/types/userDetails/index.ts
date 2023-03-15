type IBasicUserDetailsFromFirestore = {
    category: string;
    countryCode: string;
    emailId: string;
    gender: string;
    mob1: string;
    name: {
        firstName: string;
        middleName: string;
        lastName: string;
    };
    remainingVotes: number;
    role: string;
    uid: string;
};

export interface IDevUserDetailsFromFirestore extends IBasicUserDetailsFromFirestore {
    companyName: string;
    linkedIn?: string;
}

export interface IEmpUserDetailsFromFirestore extends IBasicUserDetailsFromFirestore {
    companyName: string;
    linkedIn?: string;
}

export interface ITrUserDetailsFromFirestore extends IBasicUserDetailsFromFirestore {
    schoolName?: string;
}

export interface IStUserDetailsFromFirestore extends IBasicUserDetailsFromFirestore {
    schoolName?: string;
    std?: string;
    div?: string;
}
