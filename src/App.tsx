import { lazy, Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

const LoginPage = lazy(() => import(`./pages/LoginPage`));
const RegistrationPage = lazy(() => import(`./pages/RegistrationPage`));
const DashboardPage = lazy(() => import(`./pages/DashboardPage`));

function App() {
    return (
        <div className="App">
            <Suspense
                fallback={
                    <CircularProgress
                        color="warning"
                        sx={{
                            position: 'absolute',
                            top: '45%',
                            left: '45%',
                            transform: 'translate(50%, 50%)',
                        }}
                    />
                }
            >
                <BrowserRouter>
                    <Routes>
                        <Route element={<LoginPage />} path="/" />
                        <Route element={<RegistrationPage />} path="/register" />
                        <Route element={<DashboardPage />} path="/dashboard" />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </div>
    );
}

export default App;
