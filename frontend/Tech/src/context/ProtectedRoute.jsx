import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import NotAuthorized from "@/components/pages/messages/NotAuthorized.jsx";

const ProtectedRoute = ({ superuserOnly = false }) => {
  const { user, loading, isSuperuser } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="text-white">Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (superuserOnly && !isSuperuser()) {
    // Rediriger vers une page d'accès refusé ou la page d'accueil
    return <NotAuthorized />
  }

  return <Outlet />;
};

export default ProtectedRoute;