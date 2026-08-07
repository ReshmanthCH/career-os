import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import DevrynLogo from "../components/common/DevrynLogo";

function Home() {
  const { isAuthenticated, onboardingCompleted, logout } = useAuth();

  const targetPath = onboardingCompleted ? "/dashboard" : "/onboarding";
  const targetLabel = onboardingCompleted ? "Go to Dashboard" : "Continue Onboarding";

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between">
      {/* Header Navigation */}
      <header className="px-6 py-5 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-slate-800/80">
        <Link to="/">
          <DevrynLogo size="md" showText={true} textClassName="text-xl font-bold tracking-tight text-white" />
        </Link>

        <div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={logout}
                className="text-slate-400 hover:text-white font-medium text-xs transition"
              >
                Sign Out
              </button>
              <Link
                to={targetPath}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-sm"
              >
                {targetLabel} &rarr;
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-slate-400 hover:text-white font-medium text-xs transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-sm"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6">
          <span>Devryn • Software Engineering & Placement Operating System</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
          Accelerate your software engineering interview preparation
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed font-normal">
          Track Data Structures & Algorithms, connect your GitHub & CodeChef profiles, evaluate ATS resume readiness, and receive tailored 52+ target company hiring roadmaps.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to={targetPath}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-sm"
              >
                {targetLabel} &rarr;
              </Link>
              <button
                onClick={logout}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-sm"
              >
                Get Started for Free &rarr;
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-16 text-left w-full">
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-1">
            <span className="text-indigo-400 font-bold text-xs uppercase block">52+ Companies</span>
            <span className="text-slate-300 font-medium text-xs">Interview hiring benchmarks</span>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-1">
            <span className="text-violet-400 font-bold text-xs uppercase block">7-Factor Index</span>
            <span className="text-slate-300 font-medium text-xs">Rule-based readiness scoring</span>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-1">
            <span className="text-emerald-400 font-bold text-xs uppercase block">ATS Resume Engine</span>
            <span className="text-slate-300 font-medium text-xs">Link parsing & quality scoring</span>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-1">
            <span className="text-blue-400 font-bold text-xs uppercase block">Live Integrations</span>
            <span className="text-slate-300 font-medium text-xs">CodeChef & GitHub statistics</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-800 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Devryn. Software Engineering Placement Operating System.
      </footer>
    </div>
  );
}

export default Home;