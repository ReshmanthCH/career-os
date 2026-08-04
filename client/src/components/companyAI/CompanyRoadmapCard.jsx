import React from "react";

function CompanyRoadmapCard({ roadmap, companyName }) {
  if (!roadmap) return null;

  const { dailyTasks = [], weeklyPlan = [], monthlyPlan = "", estimatedTimeline = "" } = roadmap;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center space-x-2">
          <span>📅 AI Execution Roadmap for {companyName}</span>
        </h3>
        {estimatedTimeline && (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            Timeline: {estimatedTimeline}
          </span>
        )}
      </div>

      {/* Daily Tasks */}
      <div className="space-y-3">
        <span className="text-[11px] font-bold text-indigo-900 uppercase">Daily Action Steps:</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {dailyTasks.map((dt, idx) => (
            <div key={idx} className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1.5 text-xs">
              <span className="font-bold text-indigo-950 block border-b border-indigo-100 pb-1">
                {dt.day}
              </span>
              <ul className="space-y-1 text-gray-700 font-medium">
                {dt.tasks?.map((t, tidx) => (
                  <li key={tidx} className="flex items-start space-x-1.5">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Plan & Monthly Target */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
        {weeklyPlan.length > 0 && (
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 text-xs block">🎯 Weekly Milestones:</span>
            <ul className="list-disc list-inside text-slate-700 font-medium space-y-0.5">
              {weeklyPlan.map((wp, idx) => (
                <li key={idx}>{wp}</li>
              ))}
            </ul>
          </div>
        )}

        {monthlyPlan && (
          <div className="p-3.5 bg-violet-50/50 rounded-xl border border-violet-100 space-y-1">
            <span className="font-bold text-violet-950 text-xs block">🚀 Benchmark Target:</span>
            <p className="text-violet-900 font-medium leading-relaxed">{monthlyPlan}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyRoadmapCard;
