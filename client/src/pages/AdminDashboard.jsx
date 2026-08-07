import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminStats, getAdminUsers, getAdminFeedbacks } from "../services/adminService";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    totalCompanies: 0,
    totalFeedbacks: 0,
  });

  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      setError("");
      const res = await getAdminStats();
      if (res.success) {
        setStats(res.stats || { totalUsers: 0, activeUsers: 0, newUsers: 0, totalCompanies: 0, totalFeedbacks: 0 });
      }
    } catch (err) {
      console.error("Fetch admin stats error:", err);
      const msg = err.response?.data?.message || err.message || "Failed to load platform statistics.";
      if (err.response?.status === 401) {
        setError("Admin session expired. Please logout and sign in again.");
      } else {
        setError(msg);
      }
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

  const fetchFeedbacks = async () => {
    try {
      setLoadingFeedbacks(true);
      const res = await getAdminFeedbacks();
      if (res.success) {
        setFeedbacks(res.feedbacks || []);
      }
    } catch (err) {
      console.error("Fetch admin feedbacks error:", err);
    } finally {
      setLoadingFeedbacks(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchFeedbacks();
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
    { title: "Total Users", count: stats.totalUsers, badge: "Registered Developers", color: "text-indigo-600" },
    { title: "Active Users", count: stats.activeUsers, badge: "Onboarding Completed", color: "text-emerald-600" },
    { title: "New Users (7d)", count: stats.newUsers, badge: "Recent Signups", color: "text-violet-600" },
    { title: "Companies", count: stats.totalCompanies, badge: "Hiring Benchmarks", color: "text-blue-600" },
    { title: "Total Feedbacks", count: stats.totalFeedbacks ?? feedbacks.length, badge: "User Reviews", color: "text-amber-600" },
  ];

  const renderStars = (count) => {
    return "★".repeat(count) + "☆".repeat(5 - count);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold uppercase tracking-wider mb-2">
              <span>⚡ Devryn System Administration</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Devryn Admin</h1>
            <p className="text-xs text-gray-500 mt-0.5">Overview of real-time Devryn platform statistics, registered developer users, and submitted feedback.</p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-semibold rounded-xl flex items-center justify-between">
            <span>{error}</span>
            <button onClick={handleLogout} className="underline text-red-900 font-bold ml-4">
              Logout & Re-login
            </button>
          </div>
        )}

        {/* Overview Stats Cards */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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

        {/* User Feedback Log Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">User Feedback Log</h2>
              <p className="text-xs text-gray-500">Real-time developer feedback submitted via /feedback.</p>
            </div>
            <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-bold">
              {feedbacks.length} Entries
            </span>
          </div>

          {loadingFeedbacks ? (
            <div className="py-10 text-center text-xs font-semibold text-gray-500">
              Loading user feedback log...
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              <span className="text-2xl block">💬</span>
              <p className="text-sm font-bold text-gray-800">No user feedback entries submitted yet.</p>
              <p className="text-xs text-gray-400">Feedback submitted by users on /feedback will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase text-[10px]">
                    <th className="py-3 px-4">Submitted By</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Subject & Message</th>
                    <th className="py-3 px-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {feedbacks.map((f) => (
                    <tr key={f._id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-gray-900">{f.user?.name || "Anonymous User"}</p>
                        <p className="text-[10px] text-gray-400 font-mono">{f.user?.email || ""}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          f.category === "Bug Report"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : f.category === "Feature Request"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}>
                          {f.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-amber-500 font-bold tracking-widest">{renderStars(f.rating)}</span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="font-bold text-gray-900">{f.subject}</p>
                        <p className="text-xs text-gray-600 mt-0.5 whitespace-pre-wrap">{f.message}</p>
                      </td>
                      <td className="py-3.5 px-4 text-right text-gray-500 font-mono text-[11px]">
                        {f.createdAt ? new Date(f.createdAt).toLocaleString() : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Users Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Devryn Users</h2>
              <p className="text-xs text-gray-500">List of all developer user accounts in MongoDB.</p>
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
