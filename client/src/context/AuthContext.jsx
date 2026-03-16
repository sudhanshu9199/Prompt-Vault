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

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {

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
        setuser(data.user);
    } catch (err) {
        const message = err?.response?.data?.message || "Login failed. Please try again.";
        seterror(message);
        throw new Error(message);
    }
  }, []);

  const register = useCallback(async (credentials) => {
    try {
      seterror(null);
      const { data } = await api.post('/auth/register', credentials);
      setuser(data.user);
      return data;
    } catch (err) {
      const message = err?.response?.data?.message || "Registration failed. Please try again.";
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
        login, logout, register
    }),
    [user, loading, error, login, logout, register]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(
      "[useAuth]: Must be used inside <AuthProvider>. " +
        "Wrap your component tree with <AuthProvider>."
    );
  }
  
  return context;
}
