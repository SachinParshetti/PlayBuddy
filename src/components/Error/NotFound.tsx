import React from "react";
import { Link } from "react-router-dom";
function PageNotFound()
{
    return(
        <>
          <div className="h-screen w-screen flex justify-center items-center bg-white-300">
            <div className="text-center line">
                <h1 className="text-4xl font-bold text-dark-500 animate-bounce">404</h1>
                <h2 className="text-2xl font-bold text-dark-500">Page Not Found</h2>
                <p className="text-gray-500">The page you are looking for does not exist.</p>
                <Link to="/" className="text-blue-500 animate-pulse">Go to Home</Link>
            </div>

          </div>
        
        </>
    )
}

export default PageNotFound;