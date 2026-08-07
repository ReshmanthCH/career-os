import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/adminService";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError("");

      const res = await adminLogin({ email, password });
      if (res.success && res.token) {
        localStorage.setItem("adminToken", res.token);
        localStorage.setItem("adminUser", JSON.stringify(res.admin));
        navigate("/admin", { replace: true });
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError(err.response?.data?.message || err.message || "Invalid admin login credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-gray-200 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md">
            ⚡
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">CareerOS Admin</h1>
          <p className="text-xs text-gray-500">Sign in with administrator credentials to access platform statistics.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-semibold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Admin Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@careeros.com"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Admin Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition disabled:opacity-50 mt-2"
          >
            {isSubmitting ? "Authenticating..." : "Sign In to Admin Portal →"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <a href="/login" className="text-[11px] font-semibold text-gray-400 hover:text-indigo-600 transition">
            &larr; Back to CareerOS Student Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
