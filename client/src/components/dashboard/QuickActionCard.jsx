import React from "react";
import { Link } from "react-router-dom";

function QuickActionCard() {
  const actions = [
    {
      title: "Edit Student Profile",
      desc: "Update your academic, career goals, and social links.",
      link: "/profile",
      icon: "👤",
      isAvailable: true,
      buttonText: "Open Profile",
    },
    {
      title: "Resume Intelligence",
      desc: "ATS score optimization, section audit & strengths analysis.",
      link: "/resume",
      icon: "📄",
      isAvailable: true,
      buttonText: "View Resume",
    },
    {
      title: "DSA Intelligence",
      desc: "Track problem solving across 18 topics, revision schedules & streak.",
      link: "/dsa",
      icon: "⚡",
      isAvailable: true,
      buttonText: "Open DSA Hub",
    },
    {
      title: "AI DSA Mentor",
      desc: "Personalized AI interview readiness & study roadmaps.",
      link: "/dsa/ai",
      icon: "🤖",
      isAvailable: true,
      buttonText: "Ask AI Mentor",
    },
    {
      title: "Company Intelligence",
      desc: "22+ target company profiles, interview rounds & CTC benchmarks.",
      link: "/companies",
      icon: "🏢",
      isAvailable: true,
      buttonText: "Explore Companies",
    },
    {
      title: "AI Career Copilot",
      desc: "Central 24/7 AI career guidance reasoning over your complete profile.",
      link: "/copilot",
      icon: "🚀",
      isAvailable: true,
      buttonText: "Launch Copilot",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Quick Action Modules
        </h2>
        <span className="text-xs text-gray-400 font-medium">CareerOS Suite</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((act) => (
          <div
            key={act.title}
            className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition ${
              act.isAvailable
                ? "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md"
                : "bg-gray-50/70 border-gray-200/60 opacity-80"
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{act.icon}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-xs">{act.title}</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed">{act.desc}</p>
            </div>

            <div>
              {act.isAvailable ? (
                <Link
                  to={act.link}
                  className="w-full inline-block text-center py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition"
                >
                  {act.buttonText} &rarr;
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full text-center py-2 px-3 bg-gray-200 text-gray-500 font-medium text-xs rounded-lg cursor-not-allowed"
                >
                  {act.buttonText}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickActionCard;
