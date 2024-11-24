import { Outlet } from "react-router"
import { TopBar } from "../components/Dashboard/TopBar";
import { StatCards } from "../components/Dashboard/StatCards";

export const Dashboard = () => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <div className="px-4 grid gap-3 grid-cols-12">
        <StatCards />
        <Outlet />
      </div>
    </div>
  );
};
