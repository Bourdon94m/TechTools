import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // Vous pouvez afficher un spinner de chargement ici
    return <div className="text-white">Chargement...</div>;
  }

  if (!user) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Si l'utilisateur est authentifié, rendre les routes enfants
  return <Outlet />;
};

export default ProtectedRoute;
