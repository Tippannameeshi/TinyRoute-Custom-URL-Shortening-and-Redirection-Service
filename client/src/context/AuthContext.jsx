import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { authApi } from "../api/authApi";
import {
  getStoredToken,
  setStoredToken,
  getStoredUser,
  setStoredUser,
  clearStorage,
} from "../utils/storage";

const AuthContext = createContext(null);

const isAccessTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return !payload.exp || payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  const setUserData = (userData) => {
    setUser(userData);
    setStoredUser(userData);
  };

  const clearUser = () => {
    clearStorage();
    setUser(null);
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      const token = getStoredToken();

      if (!token) {
        if (mounted) setLoading(false);
        return;
      }

      try {
        if (isAccessTokenExpired(token)) {
          const { data: refreshData } = await authApi.refreshToken();
          setStoredToken(refreshData.data.accessToken);
        }

        const { data } = await authApi.getProfile();

        if (!mounted) return;

        setUserData(data.data);
      } catch {
        if (mounted) {
          clearUser();
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (email, password) => {
    setAuthLoading(true);

    try {
      const { data } = await authApi.login({
        email,
        password,
      });

      const { user: userData, accessToken } = data.data;

      setStoredToken(accessToken);
      setUserData(userData);

      return userData;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (formData) => {
    setAuthLoading(true);

    try {
      const { data } = await authApi.register(formData);

      const { user: userData, accessToken } = data.data;

      setStoredToken(accessToken);
      setUserData(userData);

      return userData;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);

    try {
      await authApi.logout();
    } catch {
      // Ignore logout API failures
    } finally {
      clearUser();
      setAuthLoading(false);
    }
  };

  const updateProfile = async (first_name, last_name) => {
    setAuthLoading(true);

    try {
      const { data } = await authApi.updateProfile({
        first_name,
        last_name,
      });

      setUserData(data.data);

      return data.data;
    } finally {
      setAuthLoading(false);
    }
  };

  const refreshProfile = async () => {
    const { data } = await authApi.getProfile();
    setUserData(data.data);
    return data.data;
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      authLoading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "ADMIN",

      login,
      register,
      logout,
      updateProfile,
      refreshProfile,
    }),
    [user, loading, authLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
