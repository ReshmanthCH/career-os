import React from "react";
import { Link } from "react-router-dom";

function WelcomeCard({ user, profile }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
      {/* Background Subtle Shapes */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute right-20 top-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-indigo-100 border border-white/10">
            <span>🎓 Student Command Center</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {getGreeting()}, {user?.name || "Student"}! 👋
          </h1>

          <p className="text-indigo-100 text-xs sm:text-sm max-w-xl leading-relaxed">
            Targeting <span className="font-bold text-white underline decoration-indigo-300">{profile?.targetRole || "Software Engineer"}</span> • {profile?.branch || "Engineering"} @ {profile?.college || "University"} ({profile?.currentYear || "Enrolled"})
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/profile"
            className="px-4 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 font-semibold text-xs rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;
