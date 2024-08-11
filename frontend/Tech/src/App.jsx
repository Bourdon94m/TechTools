import React from 'react';
import LandingPage from './components/pages/LandingPage';
import { Login } from './components/pages/auth/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RegisterForm } from './components/pages/auth/Register';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { Toaster } from "@/components/ui/toaster"; // Importez le composant Toaster
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
        <Toaster/> {/* permet d'utiliser les toast 😋 */}
      </Router>
    </AuthProvider>

    

  );
}

export default App;