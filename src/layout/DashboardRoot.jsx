import DashboardNavbar from "@/components/Navbar/DashboardNavbar";
import Sidebar from "@/components/SideBar/Sidebar";

import React, { useState } from "react";
import { Outlet } from "react-router-dom";

export default function DashboardRoot() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <Outlet />
    </div>
  );
}
