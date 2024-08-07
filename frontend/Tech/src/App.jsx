import React from 'react';
import LandingPage from './components/pages/LandingPage';
import { Login } from './components/pages/auth/Login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { RegisterForm } from './components/pages/auth/Register';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Teamviewer from './components/pages/Teamviewer';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/teamviewer" element={<Teamviewer />} />
        </Routes>
      </Router>
    </AuthProvider>

    

  );
}

export default App;