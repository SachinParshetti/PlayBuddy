import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();
  const [isManualAuthenticated, setIsManualAuthenticated] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false); // for loading guard

  useEffect(() => {
    const loginType = localStorage.getItem("LoginType");

    if (loginType === "manual") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          const isExpired = decoded.exp * 1000 < Date.now();
          if (isExpired) {
            localStorage.removeItem("token");
            toast.error("Session expired. Please login again.");
            navigate("/user");
          } else {
            setIsManualAuthenticated(true);
          }
        } catch (err) {
          console.error("Invalid token:", err);
          localStorage.removeItem("token");
          toast.error("Invalid session. Please login again.");
          navigate("/user");
        }
      } else {
        toast.error("User not authenticated");
        navigate("/user");
      }
      setCheckedAuth(true);
    } else if (!isLoading) {
      if (!isAuthenticated) {
        toast.error("User not authenticated");
        navigate("/user");
      }
      setCheckedAuth(true);
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (!checkedAuth || isLoading) {
    return <div>Loading...</div>;
  }

  return (isAuthenticated || isManualAuthenticated) ? children : null;
};

export default ProtectedRoute;
