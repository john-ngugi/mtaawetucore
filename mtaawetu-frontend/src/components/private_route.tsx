import { ReactNode } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const nav = useNavigate();

  if (loading) {
    return <Loading>Loading, Redirecting...</Loading>;
  }

  if (isAuthenticated) {
    return children;
  } else {
    nav("/login");
  }
};

export default PrivateRoute;
