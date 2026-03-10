import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

const getToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (err) {
    return null;
  }
};

const saveToken = (token) => {
  try {
    localStorage.setItem("token", token);
  } catch (err) {
    console.error("Auth: Failed to persist token.");
  }
};

const removeToken = () => {
  try {
    localStorage.removeItem("token");
  } catch (err) {}
};

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (!token) {
        setloading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        setuser(data.user);
        seterror(null);
      } catch (err) {
        console.error("Session verification failed", err);
        localStorage.removeItem("token");
      } finally {
        setloading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    try {
        seterror(null);
        const { data } = await api.post("/auth/login", credentials);
        saveToken(data.token);
        setuser(data.user);
    } catch (err) {
        const message = err?.response?.data?.message || "Login failed. Please try again.";
        seterror(message);
        throw new Error(message);
    }
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setuser(null);
    seterror(null);
  }, []);

  const contextValue = useMemo(
    () => ({
        user, loading, error, isAuthenticated: !!user,
        login, logout,
    }),
    [user, loading, error, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
