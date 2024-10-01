import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import useCustomTheme from "./components/custom hooks/useCustomTheme";

import LandingPage from "./components/pages/LandingPage";
import { Login } from "./components/pages/auth/Login";
import { RegisterForm } from "./components/pages/auth/Register";
import Teamviewer from "./components/pages/Teamviewer";
import LandingDashboard from "@/components/pages/Dashboard/LandingDashboard";
import TicketPage from "@/components/pages/Dashboard/TicketPage";
import CreateTicketPage from "@/components/pages/Dashboard/CreateTicketPage";
import ProtectedRoute from "./context/ProtectedRoute";
import AccessDenied from "./components/messages/AccessDenied.jsx"; // Assurez-vous de créer cette page

function App() {
  useCustomTheme(); // Ceci appliquera le thème initial

  return (
    <AuthProvider>
      <div className="bg-background text-text min-h-screen">
        <Router>
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* Routes protégées pour tous les utilisateurs authentifiés */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<LandingDashboard />} />
              <Route path="/tickets" element={<TicketPage />} />
              <Route path="/create-ticket" element={<CreateTicketPage />} />
            </Route>

            {/* Routes protégées uniquement pour les superusers */}
            <Route element={<ProtectedRoute superuserOnly />}>
              <Route path="/teamviewer" element={<Teamviewer />} />
              <Route path="/register" element={<RegisterForm />} />
            </Route>

            {/* Page d'accès refusé */}
            <Route path="/access-denied" element={<AccessDenied />} />
          </Routes>
          <Toaster />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;