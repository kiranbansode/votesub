import { useEffect } from 'react';
import Header from 'components/layouts/Header';
import useAppDispatch from 'hooks/useAppDispatch';
import Pagination from 'components/layouts/Pagination';
import { HIDE_SIGN_IN_SUCCESS_POP_UP } from 'store/ui';
import { getSubjectsListFromFirestore } from 'store/dashboard/subjectsListSlice';
import { RESET_SORTED_SUBJECTS_LIST, SHOW_ONLY_FIVE } from 'store/dashboard/sortedSubjectList';
import { RESET_FILTERED_SUBJECTS } from 'store/saveFilteredSubjects';
import useAppSelector from 'hooks/useAppSelector';
import RemainingVotes from 'components/core/RemainingVotes';

import './Dashboard.styles.scss';

const DashboardPage = () => {
    const dispatch = useAppDispatch();
    const unSortedSubjectList = useAppSelector((state) => state.subjectsList.list);
    const sortedSubjectList = useAppSelector(({ sortedSubjects }) => sortedSubjects.list);
    const userId = useAppSelector(({ user }) => user.userDetails.uid);

    useEffect(() => {
        dispatch(HIDE_SIGN_IN_SUCCESS_POP_UP());
        dispatch(getSubjectsListFromFirestore());
        dispatch(RESET_FILTERED_SUBJECTS());

        return () => {
            dispatch(RESET_SORTED_SUBJECTS_LIST());
        };
    }, []);

    useEffect(() => {
        if (unSortedSubjectList.length > 0) {
            dispatch(SHOW_ONLY_FIVE(unSortedSubjectList));
        }
    }, [unSortedSubjectList.length]);

    return (
        <div id="dashboard-page">
            <Header />
            <div className="page-view">
                {userId && <RemainingVotes />}

                <p className="voting-topic"> -x- Most Favorite Subjects -x-</p>

                <div className="subject-list-container">
                    <Pagination sortedData={sortedSubjectList} unSortedData={unSortedSubjectList} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
