import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import DevrynLogo from "../components/common/DevrynLogo";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await login({ email, password });
      
      if (data?.user?.onboardingCompleted) {
        navigate(from, { replace: true });
      } else {
        navigate("/onboarding", { replace: true });
      }
    } catch (err) {
      setLocalError(err.message || "Failed to log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-800 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-3">
          <DevrynLogo size="xl" showText={false} />
          <h2 className="text-2xl font-black text-white tracking-tight">
            Welcome back to <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Devryn</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium text-center">
            Sign in to access your engineering dashboard & DSA analytics
          </p>
        </div>

        {localError && (
          <div className="bg-rose-950/60 border border-rose-800/80 p-3.5 rounded-2xl text-xs text-rose-300 font-medium">
            {localError}
          </div>
        )}

        <form className="space-y-4 text-xs" onSubmit={handleSubmit}>
          <div>
            <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@example.com"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium transition"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition disabled:opacity-50 mt-2"
          >
            {isSubmitting ? "Authenticating Developer..." : "Sign In to Devryn →"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800/80">
          <p className="text-xs text-slate-400">
            Don't have an engineering account?{" "}
            <Link to="/signup" className="font-bold text-indigo-400 hover:text-indigo-300 transition">
              Create Devryn Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;