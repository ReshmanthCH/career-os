import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminStats, getAdminUsers } from "../services/adminService";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    totalCompanies: 0,
  });

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      const res = await getAdminStats();
      if (res.success) {
        setStats(res.stats || { totalUsers: 0, activeUsers: 0, newUsers: 0, totalCompanies: 0 });
      }
    } catch (err) {
      console.error("Fetch admin stats error:", err);
      setError("Failed to load platform statistics.");
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchUsers = async (searchQuery = "") => {
    try {
      setLoadingUsers(true);
      const res = await getAdminUsers(searchQuery);
      if (res.success) {
        setUsers(res.users || []);
      }
    } catch (err) {
      console.error("Fetch admin users error:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login", { replace: true });
  };

  const statCards = [
    { title: "Total Users", count: stats.totalUsers, badge: "Registered Students", color: "text-indigo-600" },
    { title: "Active Users", count: stats.activeUsers, badge: "Onboarding Completed", color: "text-emerald-600" },
    { title: "New Users", count: stats.newUsers, badge: "Joined in Last 7 Days", color: "text-violet-600" },
    { title: "Total Companies", count: stats.totalCompanies, badge: "Hiring Benchmarks", color: "text-blue-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold uppercase tracking-wider mb-2">
              <span>⚡ CareerOS System Administration</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">CareerOS Admin</h1>
            <p className="text-xs text-gray-500 mt-0.5">Overview of real-time platform statistics and registered student user profiles.</p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-semibold rounded-xl">
            {error}
          </div>
        )}

        {/* Overview Stats Cards */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((sc) => (
              <div key={sc.title} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-1">
                <p className="text-xs font-bold text-gray-500">{sc.title}</p>
                <div className={`text-3xl font-extrabold ${sc.color}`}>
                  {loadingStats ? "..." : sc.count}
                </div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase">{sc.badge}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Users Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Users</h2>
              <p className="text-xs text-gray-500">List of all student user accounts in MongoDB.</p>
            </div>

            <div className="w-full sm:w-72">
              <input
                type="text"
                placeholder="🔍 Search users by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
              />
            </div>
          </div>

          {/* Users Table */}
          {loadingUsers ? (
            <div className="py-12 text-center text-xs font-semibold text-gray-500">
              Loading users data from MongoDB...
            </div>
          ) : users.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <span className="text-2xl block">👤</span>
              <p className="text-sm font-bold text-gray-800">No matching user accounts found.</p>
              <p className="text-xs text-gray-400">Try clearing or adjusting your search query.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase text-[10px]">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Target Role</th>
                    <th className="py-3 px-4">Joined</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-bold text-gray-900">{u.name}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-gray-600">{u.email}</td>
                      <td className="py-3.5 px-4">{u.targetRole}</td>
                      <td className="py-3.5 px-4 text-gray-500">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {u.onboardingCompleted ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Active
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            Onboarding Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
