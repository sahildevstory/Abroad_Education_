import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && (location.pathname === "/login" || location.pathname === "/register")) {
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return null;
};

export default AuthHandler;
