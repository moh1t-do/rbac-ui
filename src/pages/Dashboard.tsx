import { TopBar } from "../components/Dashboard/TopBar";
import { StatCards } from "../components/Dashboard/StatCards";
import { UserTable } from "../components/Dashboard/UserTable";

export const Dashboard = () => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <div className="px-4 grid gap-3 grid-cols-12">
        <StatCards />
        <UserTable />
      </div>
    </div>
  );
};
