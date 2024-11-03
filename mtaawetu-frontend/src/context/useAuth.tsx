import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { is_authenticated, login, register } from "../endpoints/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {GET_USER_INFO} from "../endpoints/api"

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login_user: (username: string, password: string) => Promise<void>;
  register_user: (
    firstname:string,
    lastname:string,
    username: string,
    password: string,
    cpassword: string,
    phonenumber: string,
    ward : string,
    residency: string,
    communicationMode:string,
  ) => Promise<void>;
  username: string;
  message: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(() => {
    // Retrieve the username from localStorage, or default to "Unknown"
    return localStorage.getItem("username") || "Unknown";
  });
  const [message, setMessage] = useState("");
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

  // get_user_infomation()
  const getUserStatus = async () => {
    const userInfo = GET_USER_INFO()
    const response = axios.post(userInfo, { withCredentials: true , username:username});
    return response;
    }

  const login_user = async (
    username: string,
    password: string
  ): Promise<void> => {
    try {
      const success = await login(username, password); // Should return a boolean
      if (success) {
        setIsAuthenticated(true);
        setUsername(username);
        localStorage.setItem("username", username); // Save username to localStorage
        const userData = await getUserStatus()
        console.log(userData)
        if(userData.data.user_info.is_superuser === true){
          nav("/Dashboard"); // Navigate to home on successful login
        }else{
          nav("/")
        }
      } else {
        setMessage("Error! \n User does not exist");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Problem Logging in\n" + error);
    }
  };

  const register_user = async (
    firstname:string,
    lastname:string,
    username: string,
    phonenumber: string,
    password: string,
    cpassword: string,
    ward : string,
    residency: string,
    communicationMode:string,
    
  ) => {
    try {
      // Check if all fields are filled
      if (!username || !password || !phonenumber || !cpassword) {
        setMessage("All fields are required.");
        return;
      }
      
      // Check if passwords match
      if (password !== cpassword) {
        setMessage("Passwords don't match.");
        return;
      }

      // Try registering the user if all validations pass
      try {
        await register(firstname,lastname,username,phonenumber,password,ward,residency,communicationMode); // Call your registration function
        setIsAuthenticated(true); // Set the user as authenticated
        localStorage.setItem("username", username); // Save username to localStorage
        nav("/"); // Navigate to home on successful registration
      } catch (error) {
        // Handle registration errors
        alert("Error registering user \n" + error);
        setMessage(
          "Registration failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Registration failed:", error);
      setMessage(`Unexpected error: ${error}`);
    }
  };

  useEffect(() => {
    get_authenticated();
  }, [window.location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login_user,
        register_user,
        username,
        message,
      }}
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
