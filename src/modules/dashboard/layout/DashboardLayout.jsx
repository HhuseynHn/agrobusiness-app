import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { DashboardHeader } from "../components/DashboardHeader";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#f0fdf4]/50">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
