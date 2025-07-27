import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { toast } from "react-toastify";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
function Home() {

   
    return (
        <>
            <div className="h-screen w-screen p-4 bg-gradient-to-r from-[#DFF6FF] to-[#E4F9FF] bg-hero-gradient">
                <header className="sticky top-0 w-full flex justify-between items-center p-2 text-white border rounded-lg font-inter shadow-lg">
                    <div>
                        <div className='text-3xl font-bold '>
                            <Link to="/">
                                <img src="/images/brand-logo.png" alt="logo" className="h-15" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Link to="/user-register">
                            <button className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-1 px-4 rounded-full overflow-hidden group">
                                <span className="absolute inset-0 bg-gradient-to-r from-pink-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="relative"> <LoginIcon/> </span>
                                <span className="relative"> Sign Up</span>
                            </button>
                        </Link>
                    </div>
                </header>

                <div className="flex justify-center items-center h-[90%] font-poppins">
                    < div className="text-center">
                        <div className="appear">
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500 drop-shadow-lg ">
                            Welcome to PlayBuddy
                        </h1>
                        <p className="text-xl md:text-2xl mt-4 font-poppins  text-gray-500">
                            Your Ultimate Entertainment Companion
                        </p>
                        <p className="mt-6 text-base md:text-lg text-gray-900 max-w-2xl mx-auto font-poppins">
                            Discover, binge, learn, or just vibe with PlayBuddy. Your all-in-one platform for seamless entertainment awaits!
                        </p>
                        </div>
                        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
                            <Link to="/user">
                                <button className="relative bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold py-3 px-8 rounded-full bg-[length:200%_auto] overflow-hidden group open">
                                    <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                                    <span className="relative"> <PersonIcon/> </span>
                                    <span className="relative"> User Login</span>
                                </button>
                            </Link>
                            <Link to="/admin">
                                <button className="relative bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-semibold py-3 px-8 rounded-full bg-[length:200%_auto] overflow-hidden group open" >
                                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                                    <span className="relative"><AdminPanelSettingsIcon/> </span>
                                    <span className="relative"> Admin Login</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Home;
