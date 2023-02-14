import { configureStore } from '@reduxjs/toolkit';
import counterSlice from 'store/counterSlice';
import userLoginSlice from 'store/loginPage/userLoginSlice';
import createNewUserSlice from 'store/registrationPage/createNewUserSlice';
import uiSlice from 'store/ui';
import addNewSubjectSlice from 'store/addNewSubject';
import saveUserRoleSlice from 'store/registrationPage/saveUserRoleSlice';
import subjectsListSlice from 'store/dashboard/subjectsListSlice';
import sortedSubjectsList from 'store/dashboard/sortedSubjectList';
import pageTracker from 'store/pagination/pageTracker';
import userVotingHistorySlice from 'store/votingHistory/userVotingHistorySlice';
import existingUserAuthStateSlice from 'store/existingUserAuthStateSlice/existingUserAuthStateSlice';
import addNewFeedbackSlice from 'store/addNewFeedback';
import saveFilteredSubjects from 'store/saveFilteredSubjects';
import passwordResetSlice from 'store/loginPage/passwordResetSlice';

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        user: userLoginSlice,
        registration: createNewUserSlice,
        userCategory: saveUserRoleSlice,
        ui: uiSlice,
        addNewSubject: addNewSubjectSlice,
        subjectsList: subjectsListSlice,
        sortedSubjects: sortedSubjectsList,
        currPaginationPage: pageTracker,
        votingHistory: userVotingHistorySlice,
        existingLoggedUserAuth: existingUserAuthStateSlice,
        addNewFeedback: addNewFeedbackSlice,
        filteredSubjects: saveFilteredSubjects,
        passwordReset: passwordResetSlice,
    },

    // @ts-ignore
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['user-voting-history/rejected'],
            },
        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
