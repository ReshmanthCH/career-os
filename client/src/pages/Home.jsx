import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import DevrynLogo from "../components/common/DevrynLogo";

function Home() {
  const { isAuthenticated, onboardingCompleted, logout } = useAuth();

  const targetPath = onboardingCompleted ? "/dashboard" : "/onboarding";
  const targetLabel = onboardingCompleted ? "Go to Devryn Dashboard" : "Continue Onboarding";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden">
      {/* Dynamic Glow Orbs in Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-pink-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header / Nav */}
      <header className="px-6 py-6 max-w-7xl mx-auto w-full flex items-center justify-between relative z-10">
        <Link to="/">
          <DevrynLogo size="lg" showText={true} textClassName="text-2xl font-black tracking-tight" />
        </Link>

        <div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={logout}
                className="text-slate-400 hover:text-white font-semibold text-xs transition"
              >
                Sign Out
              </button>
              <Link
                to={targetPath}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 text-white font-bold text-xs transition shadow-lg shadow-indigo-600/30"
              >
                {targetLabel} &rarr;
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-slate-400 hover:text-white font-semibold text-xs transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 text-white font-bold text-xs transition shadow-lg shadow-indigo-600/30"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-16 text-center flex flex-col items-center relative z-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-8 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Devryn • Next-Gen AI Software Engineering & Placement Operating System</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight leading-tight max-w-4xl">
          Accelerate Your{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Software Engineering
          </span>{" "}
          Career
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl leading-relaxed font-normal">
          Master Data Structures & Algorithms, connect GitHub & CodeChef metrics, assess ATS resume readiness, and receive tailored 52+ target company hiring AI roadmaps.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to={targetPath}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 text-white font-extrabold text-sm transition shadow-xl shadow-indigo-600/30"
              >
                {targetLabel} &rarr;
              </Link>
              <button
                onClick={logout}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-bold text-sm border border-slate-800 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 text-white font-extrabold text-sm transition shadow-xl shadow-indigo-600/30"
              >
                Start Free Devryn Account &rarr;
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-bold text-sm border border-slate-800 transition"
              >
                Developer Sign In
              </Link>
            </>
          )}
        </div>

        {/* Product Feature Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-16 text-left max-w-3xl w-full">
          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80 backdrop-blur-sm space-y-1">
            <span className="text-indigo-400 font-bold text-xs uppercase block">⚡ 52+ Companies</span>
            <span className="text-slate-300 font-semibold text-xs">Interview Benchmarks</span>
          </div>
          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80 backdrop-blur-sm space-y-1">
            <span className="text-purple-400 font-bold text-xs uppercase block">🧠 AI Advisor</span>
            <span className="text-slate-300 font-semibold text-xs">7-Factor Readiness Gauges</span>
          </div>
          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80 backdrop-blur-sm space-y-1">
            <span className="text-pink-400 font-bold text-xs uppercase block">📄 Resume Parser</span>
            <span className="text-slate-300 font-semibold text-xs">ATS Link Extractor</span>
          </div>
          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80 backdrop-blur-sm space-y-1">
            <span className="text-emerald-400 font-bold text-xs uppercase block">🏆 Live Scraper</span>
            <span className="text-slate-300 font-semibold text-xs">CodeChef & GitHub Sync</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-900 text-center text-xs text-slate-500 relative z-10">
        &copy; {new Date().getFullYear()} Devryn. All Rights Reserved. Full-Stack Software Engineering Operating System.
      </footer>
    </div>
  );
}

export default Home;