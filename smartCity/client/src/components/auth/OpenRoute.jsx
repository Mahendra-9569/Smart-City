import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OpenRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  if (token != null) {
    return <Navigate to="/report" replace />;
  }
  return children;
};

export default OpenRoute;
