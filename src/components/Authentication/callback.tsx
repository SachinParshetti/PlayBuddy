import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const { isLoading, isAuthenticated, error,user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("LoginType","social")
      localStorage.setItem("socialUser",JSON.stringify(user))
      navigate("/user-dashboard");
    

    } else if (error) {
      console.error("Auth0 error:", error.message);
      navigate("/user");
    }
  }, [isAuthenticated, error, navigate]);

  return <div>Loading...</div>;
};

export default Callback;
