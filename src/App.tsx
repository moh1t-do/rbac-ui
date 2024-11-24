import { useState } from "react";
import { Route, Routes, Navigate } from "react-router";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Dashboard } from "./pages/Dashboard";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Settings from "./pages/Setting";
import Team from "./pages/Team";

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <main className="flex">
      <div className={`transition-all sticky top-0 duration-300 ${isCollapsed ? "w-8" : "w-64"} bg-white h-screen`}>
        <div className="p-2 bg-white">
          <button onClick={toggleSidebar} className="bg-violet-500 text-white rounded">
            {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button>
        </div>
        {!isCollapsed && <Sidebar />}
      </div>
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </div>
    </main>
  );
}