import { Suspense, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { lazyWithPreload } from 'react-lazy-with-preload';
import useAppSelector from 'hooks/useAppSelector';
import getCurrentLoggedUser from 'utils/helperFunctions/getCurrentLoggedUser';

import './App.css';
import './regForm.css';

// Main Page Routes
const LoginPage = lazyWithPreload(() => import(`pages/LoginPage`));
const DashboardPage = lazyWithPreload(() => import(`pages/DashboardPage`));
const RegistrationPage = lazyWithPreload(() => import(`pages/RegistrationPage`));
const AddNewTopicPage = lazyWithPreload(() => import(`pages/AddNewTopicPage`));
const UserVotingHistory = lazyWithPreload(() => import(`pages/UserVotingHistory`));
const FeedbackPage = lazyWithPreload(() => import(`pages/FeedbackPage`));
const CreditsPage = lazyWithPreload(() => import(`pages/CreditsPage`));
const AboutMePage = lazyWithPreload(() => import(`pages/AboutMePage`));
const AdminPage = lazyWithPreload(() => import(`pages/AdminPage`));
const SettingsPage = lazyWithPreload(() => import(`pages/SettingsPage`));
const ProfilePage = lazyWithPreload(() => import(`pages/ProfilePage`));
const PageNotFound = lazyWithPreload(() => import(`pages/PageNotFound`));

// Dashboard Page Nested Routes
const SubjectPage = lazyWithPreload(() => import(`pages/DashboardPage/SubjectPage`));

// Registration Page Nested Routes
const StudentRegForm = lazyWithPreload(() => import('pages/RegistrationPage/StudentRegForm'));
const TeacherRegForm = lazyWithPreload(() => import('pages/RegistrationPage/TeacherRegForm'));
const EmployerRegForm = lazyWithPreload(() => import('pages/RegistrationPage/EmployerRegForm'));
const DeveloperRegForm = lazyWithPreload(() => import('pages/RegistrationPage/DeveloperRegForm'));

function App() {
    const navigate = useNavigate();
    const userDetails = useAppSelector(({ user }) => user.userDetails);

    useEffect(() => {
        // without useEffect getCurrentLoggedUser does not work properly, it enters in infinite loop
        getCurrentLoggedUser();
        if (!userDetails.uid) {
            navigate('/');
        }
    }, [userDetails.uid]);

    useEffect(() => {
        LoginPage.preload();
        DashboardPage.preload();
        SubjectPage.preload();
        AddNewTopicPage.preload();
        UserVotingHistory.preload();
        FeedbackPage.preload();
        CreditsPage.preload();
        AboutMePage.preload();
        AdminPage.preload();
        SettingsPage.preload();
        RegistrationPage.preload();
        StudentRegForm.preload();
        TeacherRegForm.preload();
        EmployerRegForm.preload();
        DeveloperRegForm.preload();
        ProfilePage.preload();
        PageNotFound.preload();
    }, []);

    return (
        <div className="app">
            <Suspense
                fallback={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                        }}
                    >
                        <CircularProgress color="warning" />
                    </div>
                }
            >
                <Routes>
                    <Route element={<LoginPage />} path="/" />
                    <Route element={<RegistrationPage />} path="/register/" />
                    <Route element={<StudentRegForm />} path="/register/student/" />
                    <Route element={<TeacherRegForm />} path="/register/teacher" />
                    <Route element={<EmployerRegForm />} path="/register/employer" />
                    <Route element={<DeveloperRegForm />} path="/register/developer" />
                    <Route element={<DashboardPage />} path="/dashboard" />
                    <Route element={<SubjectPage />} path="/dashboard/:id" />
                    <Route element={<AddNewTopicPage />} path="/addNewTopic" />
                    <Route element={<UserVotingHistory />} path="/userVotingHistory" />
                    <Route element={<FeedbackPage />} path="/feedback" />
                    <Route element={<CreditsPage />} path="/credits" />
                    <Route element={<AboutMePage />} path="/aboutMe" />
                    <Route element={<AdminPage />} path="/adminPanel" />
                    <Route element={<SettingsPage />} path="/settings" />
                    <Route element={<ProfilePage />} path="/profile" />
                    <Route element={<PageNotFound />} path="*" />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
