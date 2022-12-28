import { collection, getDocs } from 'firebase/firestore';
import { firestore } from 'config/firebase';

const getSubjectsFromFirestore = async () => {
    const subjectsSnapShot = await getDocs(collection(firestore, 'subjects'));
    const subjects: any[] = [];

    subjectsSnapShot.forEach((subject) => subjects.push(subject.data()));

    return subjects;
};

export default getSubjectsFromFirestore;
