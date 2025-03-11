import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboardIcon, ShoppingBagIcon, LogOutIcon, BarChart4Icon, MoonIcon, SunIcon, MenuIcon, XIcon, UserIcon } from "lucide-react";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    user,
    logout
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const navItems = [{
    name: "Tableau de bord",
    path: "/dashboard",
    icon: <LayoutDashboardIcon size={20} />
  }, {
    name: "Burgers",
    path: "/burgers",
    icon: <div size={20} />
  }, {
    name: "Commandes",
    path: "/orders",
    icon: <ShoppingBagIcon size={20} />
  }, {
    name: "Statistiques",
    path: "/statistics",
    icon: <BarChart4Icon size={20} />
  }];
  return <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for mobile */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white dark:bg-gray-800 shadow-lg">
          <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
            <h1 className="text-xl font-bold text-orange-500">ISI BURGER</h1>
            <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-1">
              {navItems.map(item => <Link key={item.path} to={item.path} className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${location.pathname === item.path ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"}`}>
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>)}
            </nav>
          </div>
          <div className="p-4 border-t dark:border-gray-700">
            <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <LogOutIcon size={20} className="mr-3" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      {/* Sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
        <div className="flex items-center justify-center h-16 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold text-orange-500">ISI BURGER</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            {navItems.map(item => <Link key={item.path} to={item.path} className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${location.pathname === item.path ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"}`}>
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>)}
          </nav>
        </div>
        <div className="p-4 border-t dark:border-gray-700">
          <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <LogOutIcon size={20} className="mr-3" />
            Déconnexion
          </button>
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-col flex-1 lg:pl-64">
        {/* Top header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button onClick={() => setSidebarOpen(true)} className="p-1 text-gray-500 rounded-md lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700">
              <MenuIcon size={24} />
            </button>
            <div className="flex items-center">
              <button onClick={toggleDarkMode} className="p-1 mr-4 text-gray-500 rounded-md hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700">
                {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
              </button>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                  <UserIcon size={16} />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user?.name || "Utilisateur"}
                </span>
              </div>
            </div>
          </div>
        </header>
        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>;
};
export default DashboardLayout;