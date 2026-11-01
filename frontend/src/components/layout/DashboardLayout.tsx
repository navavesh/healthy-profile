import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import AppSidebar from "./AppSidebar";

import "./DashboardLayout.css";

function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const isDashboardHome = location.pathname === "/dashboard";

  return (
    <div
      className={`dashboard-layout ${
        sidebarCollapsed ? "sidebar-collapsed" : "sidebar-expanded"
      } ${isDashboardHome ? "dashboard-home" : "dashboard-inner-page"}`}
    >
      <AppSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
      />

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
