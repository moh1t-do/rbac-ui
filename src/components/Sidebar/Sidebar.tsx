import { AccountToggle } from "./AccountToggle";
import { Search } from "./Search";
import { SidebarRouteSelect } from "./SidebarRouteSelect";

export const Sidebar = () => {
  return (
    <div className="h-[calc(100vh-32px-48px)] px-2">
      <AccountToggle />
      <Search />
      <SidebarRouteSelect />
    </div>
  );
};
