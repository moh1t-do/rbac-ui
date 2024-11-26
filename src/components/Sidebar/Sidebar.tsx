import { AccountToggle } from "./index";
import { Search } from "./index";
import { SidebarRouteSelect } from "./index";

export const Sidebar = () => {
  return (
    <div className="h-[calc(100vh-32px-48px)] px-2">
      <AccountToggle />
      <Search />
      <SidebarRouteSelect />
    </div>
  );
};
