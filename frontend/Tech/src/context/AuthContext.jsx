import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && checkTokenValidity(token)) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    } else {
      localStorage.removeItem('accessToken');
      setUser(null);
    }
  }, [checkTokenValidity]);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.detail || 'Login failed' };
      }
  
      const data = await response.json();
      localStorage.setItem('accessToken', data.access);
      const decodedToken = jwtDecode(data.access);
      setUser(decodedToken);
      return { success: true };
    } catch (error) {
      console.error("Erreur de connexion", error);
      return { success: false, message: 'An error occurred during login' };
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};