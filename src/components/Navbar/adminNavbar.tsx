import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton } from "@mui/material";

function AdminNavbar({ activeTab, setActiveTab, handleSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: "videos", label: "Manage Videos" },
    { id: "add", label: "Add Video" },
    { id: "users", label: "Manage Users" },
    { id: "categories", label: "Manage Categories" },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setIsMenuOpen(false); 
  };

  return (
    <nav className="relative">
     
      <div className="md:hidden flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Menu</h2>
        <button
          className="text-blue-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
           <MenuIcon/>
        </button>
      </div>

      <div
        className={`flex flex-col md:flex-row gap-4 md:gap-6 border-b md:border-0 md:items-center transition-all duration-300
          ${isMenuOpen ? "block" : "hidden md:flex"}`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`pb-2 px-3 text-base font-medium border-b-2 transition-all
              ${activeTab === tab.id
                ? "border-blue-500 text-blue-700 p-2"
                : "border-transparent text-gray-600 hover:text-blue-500 hover:border-blue-300"}`}
          >
            {tab.label}
          </button>
        ))}

     
        <div className="mt-4 md:mt-0 md:ml-auto">
          <button
            onClick={handleSignOut}
            className="w-full md:w-auto bg-gradient-to-r from-blue-700 to-purple-500 text-white font-semibold py-1 px-4 rounded-xl hover:opacity-90 hover:shadow-2xl"
          >
             <span className="relative"> <ExitToAppIcon/> </span>
          </button>
        
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
