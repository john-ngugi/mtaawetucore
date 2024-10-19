import { ReactNode } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const nav = useNavigate();

  if (loading) {
    return <div>Loading</div>;
  }

  if (isAuthenticated) {
    return children;
  } else {
    nav("/login");
  }
};

export default PrivateRoute;
