import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between">
      {/* Header / Nav */}
      <header className="px-6 py-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center font-bold text-2xl shadow-lg shadow-indigo-500/30">
            C
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
            CareerOS
          </span>
        </div>

        <div>
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition shadow-lg shadow-indigo-600/30"
            >
              Go to Dashboard &rarr;
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-slate-300 hover:text-white font-medium text-sm transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition shadow-lg shadow-indigo-600/30"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-8">
          <span>🚀 Phase 2 Ready</span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
          Your Personal Command Center for{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Career Acceleration
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
          Track job applications, manage resumes, track interview prep, and streamline your entire job search workflow in one unified system.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition shadow-xl shadow-indigo-600/30"
            >
              Open Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition shadow-xl shadow-indigo-600/30"
              >
                Start Free Account
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-base border border-slate-700 transition"
              >
                Existing User Sign In
              </Link>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-800 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} CareerOS. Full-stack Authentication & Core System Operational.
      </footer>
    </div>
  );
}

export default Home;