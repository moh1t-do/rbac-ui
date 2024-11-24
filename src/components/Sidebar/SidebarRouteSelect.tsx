import { useNavigate, useLocation } from "react-router";
import { IconType } from "react-icons";
import {
  FiHome,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

export const SidebarRouteSelect = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="space-y-1">
      <SidebarRoute Icon={FiHome} selected={currentPath === "/dashboard"} title="Dashboard" />
      <SidebarRoute Icon={FiUsers} selected={currentPath === "/manageteam"} title="Manage Team" />
      <SidebarRoute Icon={FiSettings} selected={currentPath === "/settings"} title="Settings" />
    </div>
  );
};

const SidebarRoute = ({
  selected,
  Icon,
  title,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
}) => {
  const navigate = useNavigate();
  return (
    <button
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${selected
        ? "bg-white text-stone-950 shadow"
        : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
        }`}
      onClick={() => {
        navigate(((title.split(' ')).join('')).toLowerCase());
      }}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </button>
  );
};
