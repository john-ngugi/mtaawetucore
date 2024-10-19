import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { is_authenticated, login, register } from "../endpoints/api"; // Make sure these imports are correct
import { useNavigate } from "react-router-dom";

// Define an interface for the Auth context
interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login_user: (username: string, password: string) => Promise<void>;
  register_user: (
    username: string,
    password: string,
    email: string,
    cpassword: string
  ) => Promise<void>;
  username: string;
}

// Create the AuthContext with the specified type
const AuthContext = createContext<AuthContextType | null>(null);

// Create the AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("Unknown");
  const nav = useNavigate();

  const get_authenticated = async () => {
    try {
      const success = await is_authenticated();
      setIsAuthenticated(success);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login_user = async (
    username: string,
    password: string
  ): Promise<void> => {
    try {
      const success = await login(username, password); // Should return a boolean
      if (success) {
        setIsAuthenticated(true);
        setUsername(username);
        nav("/"); // Navigate to home on successful login
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally, you might want to handle login errors, e.g. show a message to the user
    }
  };

  const register_user = async (
    username: string,
    password: string,
    email: string,
    cpassword: string
  ) => {
    try {
      if (password === cpassword) {
        try {
          await register(username, password, email);
          setIsAuthenticated(true);
          nav("/"); // Navigate to home on successful login
        } catch {
          alert("error registering user");
        }
      } else {
        alert("passwords dont match");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  useEffect(() => {
    get_authenticated();
  }, [window.location.pathname]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, login_user, register_user, username }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
