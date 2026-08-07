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
      setLocalError("Please enter both your email address and password.");
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
      setLocalError(err.message || "Invalid email address or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col items-center justify-center space-y-3">
          <DevrynLogo size="lg" showText={false} />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Sign in to Devryn
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter your account credentials to access your developer dashboard
            </p>
          </div>
        </div>

        {localError && (
          <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl text-xs text-red-700 font-medium">
            {localError}
          </div>
        )}

        <form className="space-y-4 text-xs" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 font-medium transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 font-medium transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition disabled:opacity-50 mt-2"
          >
            {isSubmitting ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        <div className="text-center pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;