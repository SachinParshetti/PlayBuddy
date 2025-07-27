import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/LandingPage/Home";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import UserLogin from "./components/userLogin/Login";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import UserRegister from "./components/userRegister/Register";
import PageNotFound from "./components/Error/NotFound";
import Callback from "./components/Authentication/callback";
import { ToastContainer } from "react-toastify"
import ProtectedRoute from "./components/Authentication/ProtectedRoutes";
import AdminProtectedRoute from "./components/Authentication/AdminProtectedRoute";

function App() {

  return (
    <>
      <BrowserRouter>
        <header className="backgroud">

        </header>

        <section>

          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminProtectedRoute> <AdminDashboard /></AdminProtectedRoute>} />
            <Route path="/user" element={<UserLogin />} />
          <Route path="/user-dashboard" element={<ProtectedRoute> <UserDashboard /></ProtectedRoute>} />
          
            <Route path="/user-register" element={<UserRegister />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </section>
        <ToastContainer/>

      </BrowserRouter>

    </>
  )
}

export default App
