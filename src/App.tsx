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
      {/* <p style={{ textAlign: 'center', color: 'red', margin: '0' }}>Only For Mobiles</p>
      <p style={{ textAlign: 'center', margin: '0', fontSize: '10px' }}> Try on a mobile device</p> */}
      <Suspense fallback={<CircularProgress />}>
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
