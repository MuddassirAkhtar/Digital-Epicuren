import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "https://digital-epicuren.onrender.com/api/user/me",
          { withCredentials: true }
        );

        setUser(res.data.user); // user exists
      } catch (err) {
        setUser(null); // not logged in
      } finally {
        setLoading(false); // stop loading
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};