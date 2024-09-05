import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import useCustomTheme from "./components/custom hooks/useCustomTheme";
import ThemeSelector from "./components/ui/dashboard/ThemeSelector";

import LandingPage from "./components/pages/LandingPage";
import { Login } from "./components/pages/auth/Login";
import { RegisterForm } from "./components/pages/auth/Register";
import Teamviewer from "./components/pages/Teamviewer";
import LandingDashboard from "@/components/pages/Dashboard/LandingDashboard";
import TicketPage from "@/components/pages/Dashboard/TicketPage";
import CreateTicketPage from "@/components/pages/Dashboard/CreateTicketPage";

function App() {
  useCustomTheme(); // Ceci appliquera le thème initial

  return (
    <AuthProvider>
      <div className="bg-background text-text min-h-screen"> {/* Utiliser les classes Tailwind basées sur les variables CSS */}
        <Router>
          
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/teamviewer" element={<Teamviewer />} />
            <Route path="/dashboard" element={<LandingDashboard />} />
            <Route path="/tickets" element={<TicketPage />} />
            <Route path="/create-ticket" element={<CreateTicketPage />} />
          </Routes>
          <Toaster />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;