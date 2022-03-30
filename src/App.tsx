import LoginPage from 'pages/LoginPage';
// import RegistrationPage from 'pages/RegistrationPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <p style={{ textAlign: 'center', color: 'red', margin: '0' }}>Only For Mobiles</p>
      <p style={{ textAlign: 'center', margin: '0', fontSize: '10px' }}> Try on a mobile device</p>

      <LoginPage />

      {/* <RegistrationPage /> */}
    </div>
  );
}

export default App;
