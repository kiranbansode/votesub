import { lazy, Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

// Main Page Routes
const LoginPage = lazy(() => import(`pages/LoginPage`));
const RegistrationPage = lazy(() => import(`pages/RegistrationPage`));
const DashboardPage = lazy(() => import(`pages/DashboardPage`));
const AddNewTopicPage = lazy(() => import(`pages/AddNewTopicPage`));
const UserVotingHistory = lazy(() => import(`pages/UserVotingHistory`));
const FeedbackPage = lazy(() => import(`pages/FeedbackPage`));
const CreditsPage = lazy(() => import(`pages/CreditsPage`));
const AboutMePage = lazy(() => import(`pages/AboutMePage`));
const AdminPage = lazy(() => import(`pages/AdminPage`));
const SettingsPage = lazy(() => import(`pages/SettingsPage`));

// Registration Page Nested Routes
const StudentRegForm = lazy(() => import('pages/RegistrationPage/StudentRegForm'));
const DeveloperRegForm = lazy(() => import('pages/RegistrationPage/DeveloperRegForm'));
const EmployerRegForm = lazy(() => import('pages/RegistrationPage/EmployerRegForm'));
const TeacherRegForm = lazy(() => import('pages/RegistrationPage/TeacherRegForm'));

function App() {
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
                <BrowserRouter>
                    <Routes>
                        <Route element={<LoginPage />} path="/" />
                        <Route element={<RegistrationPage />} path="/register/" />
                        <Route element={<StudentRegForm />} path="/register/student" />
                        <Route element={<TeacherRegForm />} path="/register/teacher" />
                        <Route element={<EmployerRegForm />} path="/register/employer" />
                        <Route element={<DeveloperRegForm />} path="/register/developer" />
                        <Route element={<DashboardPage />} path="/dashboard" />
                        <Route element={<AddNewTopicPage />} path="/addNewTopic" />
                        <Route element={<UserVotingHistory />} path="/userVotingHistory" />
                        <Route element={<FeedbackPage />} path="/feedback" />
                        <Route element={<CreditsPage />} path="/credits" />
                        <Route element={<AboutMePage />} path="/aboutMe" />
                        <Route element={<AdminPage />} path="/adminPanel" />
                        <Route element={<SettingsPage />} path="/settings" />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </div>
    );
}

export default App;
