import { useEffect } from 'react';
import Header from 'components/Header';
import Separator from 'components/Separator';
import useAppDispatch from 'hooks/useAppDispatch';
import Pagination from 'components/Pagination';
import { HIDE_SIGN_IN_SUCCESS_POP_UP } from 'store/ui';
import { getSubjectsListFromFirestore } from 'store/dashboard/subjectsListSlice';
import useAppSelector from 'hooks/useAppSelector';

import './Dashboard.styles.scss';

const DashboardPage = () => {
    const dispatch = useAppDispatch();
    const { subjectsList } = useAppSelector((state) => state);

    useEffect(() => {
        dispatch(HIDE_SIGN_IN_SUCCESS_POP_UP());
        // Get all subjects from firestore when component gets first rendered
        dispatch(getSubjectsListFromFirestore());
    }, []);

    return (
        <div id="dashboard-page">
            <Header />

            <p id="remaining-votes">
                Your Remaining Votes : <span>100</span>
            </p>
            <Separator />

            <p className="voting-topic"> -x- Most Favorite Subjects -x-</p>

            <div className="subject-list-container">
                <Pagination data={subjectsList.list} />
            </div>
        </div>
    );
};

export default DashboardPage;
