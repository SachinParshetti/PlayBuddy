import React from "react";
import { Navigate } from "react-router-dom";
import { useEffect , useState} from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";


const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    interface AdminTokenPayload {
        admin_id:string;
    }
    useEffect(() => {
        const token = localStorage.getItem("admin-Token");
        if(token)
        {
            try
            {
                const decoded = jwtDecode<AdminTokenPayload>(token);
                if(decoded.admin_id)
                {
                    setIsAuthenticated(true)
                    setIsLoading(false)
                }
                else
                {
                    toast.error("Invalid token");
                    localStorage.removeItem("admin-Token");
                    setIsLoading(false)
                }
            }
            catch(error)
            {
                toast.error("Invalid token");
                localStorage.removeItem("admin-Token");
                setIsLoading(false)
            }
        }
        else
        {
            toast.error("Unauthorized access");
            setIsLoading(false)
        }
        
    },[]);

    if(isLoading)
    {
        return <div>Loading...</div>
    }

    if(!isAuthenticated)
    {
        return <Navigate to="/admin" />
    }

    return children;
}

export default AdminProtectedRoute;