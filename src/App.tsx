import { Suspense, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { lazyWithPreload } from 'react-lazy-with-preload';
import useAppSelector from 'hooks/useAppSelector';
import getCurrentLoggedUser from 'features/getCurrentLoggedUser';

import 'animate.css';

import './App.css';
import './regForm.css';
import LoadingScreen from 'components/UI/LoadingScreen';

// Main Page Routes
const LoginPage = lazyWithPreload(() => import(`pages/LoginPage`));
const DashboardPage = lazyWithPreload(() => import(`pages/DashboardPage`));
const RegistrationPage = lazyWithPreload(() => import(`pages/RegistrationPage`));
const AddNewSubjectPage = lazyWithPreload(() => import(`pages/AddNewSubjectPage`));
const UserVotingHistory = lazyWithPreload(() => import(`pages/UserVotingHistory`));
const FeedbackPage = lazyWithPreload(() => import(`pages/FeedbackPage`));
const CreditsPage = lazyWithPreload(() => import(`pages/CreditsPage`));
const AboutMePage = lazyWithPreload(() => import(`pages/AboutMePage`));
const AdminPage = lazyWithPreload(() => import(`pages/AdminPage`));
const SettingsPage = lazyWithPreload(() => import(`pages/SettingsPage`));
const ProfilePage = lazyWithPreload(() => import(`pages/ProfilePage`));
const PageNotFound = lazyWithPreload(() => import(`pages/PageNotFound`));

// Login Page Nested Routes
const PasswordResetPage = lazyWithPreload(() => import('pages/LoginPage/PasswordReset'));

// Dashboard Page Nested Routes
const SubjectPage = lazyWithPreload(() => import(`pages/DashboardPage/SubjectPage`));
const SearchQueryPage = lazyWithPreload(() => import(`pages/DashboardPage/SearchQueryPage`));

// Registration Page Nested Routes
const StudentRegForm = lazyWithPreload(() => import('pages/RegistrationPage/StudentRegForm'));
const TeacherRegForm = lazyWithPreload(() => import('pages/RegistrationPage/TeacherRegForm'));
const EmployerRegForm = lazyWithPreload(() => import('pages/RegistrationPage/EmployerRegForm'));
const DeveloperRegForm = lazyWithPreload(() => import('pages/RegistrationPage/DeveloperRegForm'));

function App() {
    const navigate = useNavigate();
    const userAuthSlice = useAppSelector(({ user }) => user);
    const { showSignOutSuccessPopUp } = useAppSelector(({ ui }) => ui);

    useEffect(() => {
        // without useEffect getCurrentLoggedUser does not work properly, it enters in infinite loop
        getCurrentLoggedUser();
        navigate('/');
    }, []);

    useEffect(() => {
        if (showSignOutSuccessPopUp || !userAuthSlice.userDetails.uid) {
            setTimeout(() => {
                navigate('/');
            }, 2000);
            return;
        }

        if (!userAuthSlice.userDetails.uid) {
            navigate('/');
        }
    }, [userAuthSlice.userDetails.uid]);

    useEffect(() => {
        LoginPage.preload();
        PasswordResetPage.preload();
        DashboardPage.preload();
        SubjectPage.preload();
        SearchQueryPage.preload();
        AddNewSubjectPage.preload();
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

    return userAuthSlice.loading.existing ? (
        <LoadingScreen fullScreenPlus />
    ) : (
        <div className="app">
            <Suspense fallback={<LoadingScreen fullScreenPlus />}>
                <Routes>
                    <Route element={<LoginPage />} path="/" />
                    <Route element={<PasswordResetPage />} path="/forgotPassword" />
                    <Route element={<RegistrationPage />} path="/register/" />
                    <Route element={<StudentRegForm />} path="/register/student" />
                    <Route element={<TeacherRegForm />} path="/register/teacher" />
                    <Route element={<EmployerRegForm />} path="/register/employer" />
                    <Route element={<DeveloperRegForm />} path="/register/developer" />
                    <Route element={<DashboardPage />} path="/dashboard" />
                    <Route element={<SubjectPage />} path="/dashboard/:id" />
                    <Route element={<SearchQueryPage />} path="/dashboard/search" />
                    <Route element={<AddNewSubjectPage />} path="/addNewSubject" />
                    <Route element={<UserVotingHistory />} path="/userVotingHistory" />
                    <Route element={<FeedbackPage />} path="/feedback" />
                    <Route element={<CreditsPage />} path="/credits" />
                    <Route element={<AboutMePage />} path="/aboutMe" />
                    <Route element={<AdminPage />} path="/adminPanel" />
                    <Route element={<SettingsPage />} path="/settings" />
                    <Route element={<ProfilePage />} path="/profile" />
                    <Route element={<PageNotFound />} path="/error" />
                    <Route element={<PageNotFound />} path="*" />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
