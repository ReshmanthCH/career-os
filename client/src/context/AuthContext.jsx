import { createContext, useState, useEffect, useCallback } from "react";
import {
  loginUser as apiLoginUser,
  registerUser as apiRegisterUser,
  getCurrentUser as apiGetCurrentUser,
} from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize & verify token on app load / refresh
  const checkAuthStatus = useCallback(async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setUser(null);
      setToken(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await apiGetCurrentUser();
      if (data.success && data.user) {
        setUser(data.user);
        setToken(storedToken);
      } else {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiLoginUser(credentials);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        return data;
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiRegisterUser(userData);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        return data;
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Signup failed. Please try again.";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  const clearError = () => setError(null);

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    loading,
    error,
    login,
    signup,
    logout,
    clearError,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
