import { useState, useEffect } from 'react';
import { firestore } from 'config/firebase';
import { getDocs, collection } from 'firebase/firestore';

const useGetTotalUser = () => {
    const [totalUser, setTotalUser] = useState<number>(0);
    const usersRef = collection(firestore, 'users');

    useEffect(() => {
        (async () => {
            const rawTotalUser: string[] = [];
            const rawUsersDetails = await getDocs(usersRef);

            rawUsersDetails.forEach((user) => {
                rawTotalUser.push(user.data().uid);
            });

            setTotalUser(rawTotalUser.length);
        })();
    }, []);

    return totalUser;
};
export default useGetTotalUser;
