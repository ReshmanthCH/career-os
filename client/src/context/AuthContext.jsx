import { createContext, useState, useEffect, useCallback } from "react";
import {
  loginUser as apiLoginUser,
  registerUser as apiRegisterUser,
  getCurrentUser as apiGetCurrentUser,
} from "../services/authService";
import { getProfile as apiGetProfile } from "../services/profileService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize & verify token & profile on app load / refresh
  const checkAuthStatus = useCallback(async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setUser(null);
      setProfile(null);
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

        // Fetch profile if user has completed onboarding
        if (data.user.onboardingCompleted) {
          try {
            const profileRes = await apiGetProfile();
            if (profileRes.success) {
              setProfile(profileRes.profile);
            }
          } catch (profileErr) {
            console.error("Failed to load profile:", profileErr);
          }
        }
      } else {
        localStorage.removeItem("token");
        setUser(null);
        setProfile(null);
        setToken(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      localStorage.removeItem("token");
      setUser(null);
      setProfile(null);
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

        if (data.user?.onboardingCompleted) {
          const profileRes = await apiGetProfile();
          if (profileRes.success) {
            setProfile(profileRes.profile);
          }
        } else {
          setProfile(null);
        }

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
        setProfile(null);
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

  const refreshProfile = async () => {
    try {
      const userRes = await apiGetCurrentUser();
      if (userRes.success) {
        setUser(userRes.user);
      }
      const profileRes = await apiGetProfile();
      if (profileRes.success) {
        setProfile(profileRes.profile);
      }
    } catch (err) {
      console.error("Refresh profile error:", err);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setProfile(null);
    setError(null);
  }, []);

  const clearError = () => setError(null);

  const value = {
    user,
    profile,
    token,
    isAuthenticated: !!token && !!user,
    onboardingCompleted: !!user?.onboardingCompleted,
    loading,
    error,
    login,
    signup,
    logout,
    clearError,
    checkAuthStatus,
    refreshProfile,
    setProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
