import LandingPage from "./components/pages/LandingPage";
import { Login } from "./components/pages/auth/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RegisterForm } from "./components/pages/auth/Register";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "@/components/ui/toaster"; // Importez le composant Toaster
import Teamviewer from "./components/pages/Teamviewer";
import LandingDashboard from "@/components/pages/Dashboard/LandingDashboard";
import TicketPage from "@/components/pages/Dashboard/TicketPage";
import CreateTicketPage from "@/components/pages/Dashboard/CreateTicketPage";

function App() {
  return (
    <AuthProvider>
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
        <Toaster /> {/* permet d'utiliser les toast 😋 */}
      </Router>
    </AuthProvider>
  );
}

export default App;
