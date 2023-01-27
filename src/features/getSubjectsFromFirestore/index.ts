import { collection, getDocs } from 'firebase/firestore';
import { firestore } from 'config/firebase';

const getSubjectsFromFirestore = async () => {
    const subjectsSnapShot = await getDocs(collection(firestore, 'subjects'));
    const subjects: any[] = [];

    subjectsSnapShot.forEach((subject) => subjects.push(subject.data()));

    const sortedSubjects = subjects.sort((prevSub, currSub) =>
        prevSub.createdOn > currSub.createdOn ? -1 : 1,
    );

    if (sortedSubjects.length > 0) {
        return sortedSubjects;
    }

    return [];
};

export default getSubjectsFromFirestore;
