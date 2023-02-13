import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, AlertTitle } from '@mui/material';
import useAppSelector from 'hooks/useAppSelector';
import Header from 'components/layouts/Header';
import LoadingScreen from 'components/UI/LoadingScreen';
import PageTitle from 'components/UI/Title';

import VotingHistory from 'components/core/VotingHistory';
import useAppDispatch from 'hooks/useAppDispatch';
import {
    getUserVotingHistoryThunk,
    RESET_USER_VOTING_HISTORY,
} from 'store/votingHistory/userVotingHistorySlice';
import InputFieldWrapper from 'styled/InputFieldWrapper';

import './UserVotingHistory.styles.scss';

const UserVotingHistory = () => {
    const dispatch = useAppDispatch();
    const { history, error, loading } = useAppSelector(({ votingHistory }) => votingHistory);

    const showErrorMssg = error.message ? (
        <>
            <InputFieldWrapper className="error-container">
                <Alert severity="error" variant="filled">
                    <AlertTitle>Error</AlertTitle>
                    {error.message}
                </Alert>
            </InputFieldWrapper>

            <div className="dashboard-link">
                <Link to="/dashboard">Go to Dashboard</Link>
            </div>
        </>
    ) : null;

    useEffect(() => {
        dispatch(getUserVotingHistoryThunk());

        return () => {
            dispatch(RESET_USER_VOTING_HISTORY());
        };
    }, []);

    return (
        <div className="user-voting-history-page">
            <Header />

            {loading ? (
                <LoadingScreen fullScreen />
            ) : (
                <div className="page-view">
                    <PageTitle title="Voting History" />
                    {showErrorMssg}

                    {history.map((dayHistory: any) => (
                        <VotingHistory dayHistory={dayHistory} key={dayHistory[0]?.createdOn} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserVotingHistory;
