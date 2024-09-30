import React, { createContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkTokenValidity = useCallback((token) => {
    if (!token) return false;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }, []);

  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return false;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.access);
      const decodedToken = jwtDecode(data.access);
      setUser({
        ...decodedToken,
        is_superuser: decodedToken.is_superuser
      });
      return true;
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du token", error);
      logout();
      return false;
    }
  }, []);

  const initAuth = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    if (token && checkTokenValidity(token)) {
      const decodedToken = jwtDecode(token);
      setUser({
        ...decodedToken,
        is_superuser: decodedToken.is_superuser
      });
    } else if (await refreshToken()) {
      // Token refreshed successfully
    } else {
      logout();
    }
    setLoading(false);
  }, [checkTokenValidity, refreshToken]);

  useEffect(() => {
    initAuth();

    // Vérification périodique du token
    const intervalId = setInterval(() => {
      const token = localStorage.getItem("accessToken");
      if (!checkTokenValidity(token)) {
        refreshToken();
      }
    }, 5 * 60 * 1000); // Vérifier toutes les 5 minutes

    return () => clearInterval(intervalId);
  }, [initAuth, checkTokenValidity, refreshToken]);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.detail || "Login failed" };
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      const decodedToken = jwtDecode(data.access);
      setUser({
        ...decodedToken,
        is_superuser: decodedToken.is_superuser // Assurez-vous que ce champ est inclus dans le token JWT côté backend
      });
      return { success: true };
    } catch (error) {
      console.error("Erreur de connexion", error);
      return { success: false, message: "An error occurred during login" };
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  }, []);

  const isSuperuser = useCallback(() => {
    return user?.is_superuser === true;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, refreshToken, loading, isSuperuser }}
    >
      {children}
    </AuthContext.Provider>
  );
};