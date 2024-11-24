import { TopBar } from "./TopBar";
import { StatCards } from "./StatCards";
import { UserTable } from "./UserTable";

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
