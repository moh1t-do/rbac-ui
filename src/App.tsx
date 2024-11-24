import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Dashboard } from "./pages/Dashboard";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Settings from "./pages/Setting";
import { UserTable } from "./components/Dashboard/UserTable";
import RoleTable from "./components/Dashboard/RoleTable";

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const checkOrientation = () => {
    if (window.matchMedia("(orientation: portrait)").matches) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  useEffect(() => {
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  return (
    <main className="flex">
      <div className={`transition-all sticky top-0 duration-300 ${isCollapsed ? "w-8" : "w-48 md:w-64"} bg-white h-screen`}>
        <div className="p-2 bg-white">
          <button onClick={toggleSidebar} className="bg-violet-500 text-white rounded">
            {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button>
        </div>
        {!isCollapsed && <Sidebar />}
      </div>
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="users" element={<UserTable />} />
            <Route path="roles" element={<RoleTable />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </main>
  );
}