import { useNavigate } from "react";
import useAuth from "../../hooks/useAuth";

function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Left side: Logo & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              C
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              CareerOS
            </span>
          </div>
        </div>

        {/* Right side: User Profile Badge & Logout */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-gray-50 border border-gray-200 py-1.5 px-3 rounded-full">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-xs shadow">
              {getInitials(user?.name)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-gray-900 leading-none">{user?.name || "User"}</p>
              <p className="text-[10px] text-gray-500 leading-none mt-0.5">{user?.email || ""}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-1 px-3 py-1.5 border border-red-200 text-xs font-medium rounded-lg text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 transition-colors focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
