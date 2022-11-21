import useAppSelector from 'hooks/useAppSelector';
import Header from 'components/Header';
import { useEffect } from 'react';
import VotingHistory from 'components/VotingHistory';
import Separator from 'components/Separator';

import './UserVotingHistory.styles.scss';
import useAppDispatch from 'hooks/useAppDispatch';
import {
    getUserVotingHistoryThunk,
    RESET_USER_VOTING_HISTORY,
} from 'store/votingHistory/userVotingHistorySlice';

const UserVotingHistory = () => {
    const dispatch = useAppDispatch();
    const { history } = useAppSelector(({ votingHistory }) => votingHistory);

    useEffect(() => {
        dispatch(getUserVotingHistoryThunk());

        return () => {
            dispatch(RESET_USER_VOTING_HISTORY());
        };
    }, []);

    return (
        <div className="user-voting-history-page">
            <Header />

            <div className="page-view">
                <h2>Voting History</h2>
                <Separator />
                {history.map((dayHistory: any) => (
                    <VotingHistory dayHistory={dayHistory} key={dayHistory[0]?.createdOn} />
                ))}
            </div>
        </div>
    );
};

export default UserVotingHistory;
