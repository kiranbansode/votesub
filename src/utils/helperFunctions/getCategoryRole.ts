import { auth } from 'config/firebase';

const getUserCategory = async () => {
    const category = (await auth.currentUser?.getIdTokenResult())?.claims.category;
    return category;
};

export default getUserCategory;
