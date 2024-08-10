import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element, requiredRole }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("user_role");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/unAuthenticated");
    } else if (!requiredRole.includes(userRole)) {
      navigate("/unAuthorized");
    }
  }, [isAuthenticated, userRole, requiredRole, navigate]);

  // Render the protected content or null if redirecting
  return isAuthenticated && requiredRole.includes(userRole) ? element : null;
};

export default ProtectedRoute;
