import React from 'react';
import LandingPage from './components/pages/LandingPage';
import { Login } from './components/pages/auth/Login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { RegisterForm } from './components/pages/auth/Register';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
    

  );
}

export default App;