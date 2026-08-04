import React from "react";

function RoadmapCard({ roadmap, onGenerate, isGenerating }) {
  if (!roadmap) {
    return (
      <div className="bg-white rounded-2xl p-10 border border-gray-200 text-center space-y-4 shadow-sm max-w-lg mx-auto">
        <span className="text-4xl block">📅</span>
        <h3 className="text-lg font-bold text-gray-900">Personalized Execution Roadmap</h3>
        <p className="text-xs text-gray-500">
          Generate custom multi-tiered execution roadmaps (Today, Weekly, Monthly, Quarterly, and Semester plans) tailored to your target companies.
        </p>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-xs rounded-xl shadow transition"
        >
          {isGenerating ? "🧠 Generating..." : "✨ Generate Personal Roadmap"}
        </button>
      </div>
    );
  }

  const {
    estimatedTimeline = "12 Weeks",
    todayPlan = [],
    weeklyPlan = [],
    monthlyPlan = [],
    quarterlyPlan = [],
    semesterPlan = [],
  } = roadmap;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase mb-2 border border-indigo-200">
            <span>Timeline: {estimatedTimeline}</span>
          </div>
          <h2 className="text-xl font-extrabold text-gray-900">Multi-Tier Execution Roadmap</h2>
        </div>

        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow transition disabled:opacity-50"
        >
          {isGenerating ? "Regenerating..." : "🔄 Regenerate Roadmap"}
        </button>
      </div>

      {/* Today's Action Plan */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center space-x-2">
          <span>⚡ Today's Execution Schedule</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {todayPlan.map((tp, idx) => (
            <div key={idx} className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1 text-xs">
              <span className="font-bold text-indigo-950 block">{tp.time || `Block ${idx + 1}`}</span>
              <p className="text-gray-800 font-semibold">{tp.task}</p>
              {tp.focus && (
                <span className="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-bold text-[10px]">
                  Focus: {tp.focus}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly & Monthly Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weekly */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            🎯 Weekly Milestones
          </h3>
          <div className="space-y-3 text-xs">
            {weeklyPlan.map((wp, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">{wp.week}: {wp.milestone}</span>
                <ul className="list-disc list-inside text-slate-700 font-medium space-y-0.5">
                  {wp.tasks?.map((t, tidx) => (
                    <li key={tidx}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            🚀 Monthly Targets
          </h3>
          <div className="space-y-3 text-xs">
            {monthlyPlan.map((mp, idx) => (
              <div key={idx} className="p-3 bg-violet-50/60 rounded-xl border border-violet-100 space-y-1">
                <span className="font-bold text-violet-950 block">{mp.month}: {mp.theme}</span>
                <p className="text-violet-900 font-medium">{mp.goal}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadmapCard;
