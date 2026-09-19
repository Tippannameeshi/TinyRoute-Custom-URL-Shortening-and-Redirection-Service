import React, { createContext, useState, useEffect, useContext } from 'react';
import { authApi } from '../api/authApi';
import { getStoredToken, setStoredToken, getStoredUser, setStoredUser, clearStorage } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getStoredToken();
      if (token) {
        try {
          const { data } = await authApi.getProfile();
          setUser(data.data);
          setStoredUser(data.data);
        } catch (err) {
          clearStorage();
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const { data } = await authApi.login({ email, password });
    const { user: userData, accessToken } = data.data;

    setStoredToken(accessToken);
    setStoredUser(userData);
    setUser(userData);
    return userData;
  };

  const register = async (formData) => {
    const { data } = await authApi.register(formData);
    const { user: userData, accessToken } = data.data;

    setStoredToken(accessToken);
    setStoredUser(userData);
    setUser(userData);
    return userData;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      // Ignore network/server logout errors
    } finally {
      clearStorage();
      setUser(null);
    }
  };

  const updateProfile = async (first_name, last_name) => {
    const { data } = await authApi.updateProfile({ first_name, last_name });
    const updatedUser = data.data;
    setUser(updatedUser);
    setStoredUser(updatedUser);
    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
