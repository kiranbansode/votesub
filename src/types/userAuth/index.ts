import { User } from 'firebase/auth';

export interface INeededUserCredentials {
    uid: User['uid'];
    email: User['email'];
    emailVerified: User['emailVerified'];
    displayName: User['displayName'];
    phoneNumber: User['phoneNumber'];
    photoURL: User['photoURL'];
    providerId: User['providerId'];
}
