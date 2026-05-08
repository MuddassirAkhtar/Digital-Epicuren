import { createContext, useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import api from "../utils/axiosInstance"; // ✅ import axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const restoreSession = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
        { withCredentials: true }
      );
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
      api.accessToken = res.data.accessToken; // ✅ sync to axios instance
    } catch (err) {
      setUser(null);
      setAccessToken(null);
      api.accessToken = null; // ✅ sync to axios instance
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const login = (accessToken, userData) => {
    setAccessToken(accessToken);
    setUser(userData);
    api.accessToken = accessToken; // ✅ sync to axios instance
  };

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setAccessToken(null);
      setUser(null);
      api.accessToken = null; // ✅ sync to axios instance
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      accessToken,
      setAccessToken,
      login,
      logout,
      loading,
      isLoggedIn: !!accessToken,
      checkAuth: restoreSession,
      restoreSession,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};