import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import DevrynLogo from "../common/DevrynLogo";

function Navbar({ onToggleSidebar }) {
  let user = null;
  let logout = () => {};

  try {
    const auth = useAuth();
    user = auth?.user || null;
    logout = auth?.logout || (() => {});
  } catch (err) {
    console.error("Navbar auth context error:", err);
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
    } catch (err) {
      console.error("Logout error:", err);
    }
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name || typeof name !== "string" || !name.trim()) return "D";
    try {
      const parts = name.trim().split(/\s+/).filter(Boolean);
      if (parts.length === 0) return "D";
      return parts
        .map((part) => (part && part[0] ? part[0] : ""))
        .filter(Boolean)
        .join("")
        .toUpperCase()
        .slice(0, 2);
    } catch (err) {
      return "D";
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 shadow-sm transition-all">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Left side: Devryn Logo & Mobile Sidebar Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div onClick={() => navigate("/dashboard")}>
            <DevrynLogo size="md" showText={true} textClassName="text-xl font-black tracking-tight" />
          </div>
        </div>

        {/* Right side: User Profile Badge & Logout */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center space-x-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 py-1.5 px-3 rounded-full transition shadow-xs cursor-pointer" onClick={() => navigate("/profile")}>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {getInitials(user?.name)}
            </div>
            <div className="hidden sm:block text-left pr-1">
              <p className="text-xs font-bold text-slate-900 leading-none">{user?.name || "Developer"}</p>
              <p className="text-[10px] text-slate-500 font-medium leading-none mt-0.5">{user?.email || ""}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 border border-rose-200 text-xs font-semibold rounded-xl text-rose-600 bg-rose-50/60 hover:bg-rose-100/80 hover:text-rose-700 transition shadow-xs focus:outline-none"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
