import { Outlet } from "react-router";
import { StatCards } from "../components/Dashboard/StatCards";

export const Dashboard = () => {
  return (
    <>
      <StatCards />
      <Outlet />
    </>
  );
};
