import useAuth from "../hooks/useAuth";
import DashboardLayout from "../components/layout/DashboardLayout";

function Dashboard() {
  const { user, logout, token } = useAuth();

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                Active Session
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {user?.name || "User"}! 👋
              </h1>
              <p className="text-indigo-100 text-sm mt-1 max-w-xl">
                Here is an overview of your CareerOS account state, active JWT session, and core system modules.
              </p>
            </div>
            
            <button
              onClick={logout}
              className="px-4 py-2 bg-white text-indigo-700 hover:bg-indigo-50 font-semibold text-sm rounded-xl shadow transition focus:outline-none"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* User Information Card & Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center justify-between">
              <span>Account Details</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            </h2>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-medium text-gray-500">Full Name</p>
                <p className="font-semibold text-gray-900">{user?.name || "N/A"}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">Email Address</p>
                <p className="font-semibold text-gray-900">{user?.email || "N/A"}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">User ID</p>
                <p className="font-mono text-xs text-gray-700 bg-gray-100 p-1.5 rounded truncate">
                  {user?.id || user?._id || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">Member Since</p>
                <p className="font-semibold text-gray-900">{formattedDate}</p>
              </div>
            </div>
          </div>

          {/* Session & Security Status */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              Authentication Status
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-1 border-b border-gray-50">
                <span className="text-gray-600">Auth Token</span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                  {token ? "JWT Stored" : "Missing"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-gray-50">
                <span className="text-gray-600">Route Security</span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800">
                  Protected Gate
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-gray-50">
                <span className="text-gray-600">Auto Refresh</span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-800">
                  Active
                </span>
              </div>

              <div className="pt-2">
                <p className="text-xs font-medium text-gray-500 mb-1">JWT Bearer Token Snippet</p>
                <p className="font-mono text-[11px] text-gray-600 bg-gray-50 border border-gray-200 p-2 rounded break-all">
                  {token ? `${token.substring(0, 32)}...` : "None"}
                </p>
              </div>
            </div>
          </div>

          {/* Core System Status */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              Phase 2 Modules
            </h2>

            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center space-x-2 text-gray-700">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>JWT Authentication & Persistence</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-700">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Protected Routes & Guest Guards</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-700">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Global Auth Context & Hooks</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-700">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Centralized Axios Interceptors</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-700">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Responsive App Layout (Navbar & Sidebar)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;