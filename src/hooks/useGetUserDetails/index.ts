import { useEffect, useState } from 'react';
import { auth, firestore } from 'config/firebase';
import { getDoc, doc } from 'firebase/firestore';
import getUserRole from 'utils/helperFunctions/getUserRole';
import {
    IDevUserDetailsFromFirestore,
    IEmpUserDetailsFromFirestore,
    IStUserDetailsFromFirestore,
    ITrUserDetailsFromFirestore,
} from 'types/userDetails';

const useGetUserDetails = () => {
    const [userDetails, setUserDetails] = useState<
        | IDevUserDetailsFromFirestore
        | IEmpUserDetailsFromFirestore
        | IStUserDetailsFromFirestore
        | ITrUserDetailsFromFirestore
        | { [x: string]: any }
    >({});
    const [userRole, setUserRole] = useState<string | null>(null);
    const userId = auth.currentUser?.uid!;

    const userSnapShot = userId ? doc(firestore, 'users', userId) : '';

    useEffect(() => {
        (async () => {
            // @ts-ignore
            const user = (await getDoc(userSnapShot)).data();
            // @ts-ignore

            setUserDetails(user);

            if (user?.uid) {
                setUserRole(getUserRole(user?.category, user?.role));
            }
        })();
    }, []);

    // eslint-disable-next-line consistent-return
    return { userDetails, userRole };
};

export default useGetUserDetails;
