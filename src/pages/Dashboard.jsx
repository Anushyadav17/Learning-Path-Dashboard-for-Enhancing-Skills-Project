import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/cors/Dashboard/Sidebar";
import { FaBars } from "react-icons/fa"; // Import an icon for the toggle button

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle

  if (authLoading || profileLoading) {
    return (
      <div className="mt-10 flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative md:flex">
      {/* Sidebar Toggle Button for Small Screens */}
      <div 
        className={`md:hidden w-full ${isSidebarOpen ? 'bg-richblue-800' : 'none'}`}
      >
        <button
          className={`md:hidden p-2 `}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed md:relative z-10 ${isSidebarOpen ? 'left-0' : '-left-full'} md:left-0 transition-left duration-300 bg-richblue-800`}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-[calc(100vh-6.5rem)] overflow-auto md:h-[calc(100vh-3.5rem)]">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
