import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { FiSidebar } from "react-icons/fi";
import { Dashboard } from "./pages/index";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Settings } from "./components/Settings/index";
import { TopBar, UserTable, RoleTable } from "./components/Dashboard/index";

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
            <FiSidebar size={20} />
          </button>
        </div>
        {!isCollapsed && <Sidebar />}
      </div>
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg pb-4 shadow">
          <TopBar />
          <div className="px-4 grid gap-3 grid-cols-12">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="users" element={<UserTable />} />
                <Route path="roles" element={<RoleTable />} />
              </Route>
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </main>
  );
}