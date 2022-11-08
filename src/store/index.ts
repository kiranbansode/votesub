import { configureStore } from '@reduxjs/toolkit';
import counterSlice from 'store/counterSlice';
import userLoginSlice from 'store/loginPage/userLoginSlice';
import createNewUserSlice from 'store/registrationPage/createNewUserSlice';
import uiSlice from 'store/ui';
import addNewTopicSlice from 'store/addNewTopic';
import saveUserRoleSlice from 'store/registrationPage/saveUserRoleSlice';
import subjectsListSlice from 'store/dashboard/subjectsListSlice';

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        user: userLoginSlice,
        registration: createNewUserSlice,
        userRole: saveUserRoleSlice,
        ui: uiSlice,
        addNewTopic: addNewTopicSlice,
        subjectsList: subjectsListSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
