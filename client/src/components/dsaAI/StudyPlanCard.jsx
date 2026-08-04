import React from "react";

function StudyPlanCard({ studyPlan }) {
  if (!studyPlan) return null;

  const { dailyPlan = [], weeklyFocus = [], monthlyGoal = "" } = studyPlan;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center space-x-2">
          <span>📅 AI Personalized Study Roadmap</span>
        </h3>
        <span className="text-[10px] text-indigo-600 font-bold">Dynamic Progression</span>
      </div>

      {/* Daily Plan */}
      <div className="space-y-3">
        <span className="text-[11px] font-bold text-indigo-900 uppercase">Daily Task Execution Plan:</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {dailyPlan.map((dp, idx) => (
            <div key={idx} className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1.5 text-xs">
              <span className="font-bold text-indigo-950 block border-b border-indigo-100 pb-1">
                {dp.day}
              </span>
              <ul className="space-y-1 text-gray-700 font-medium">
                {dp.tasks?.map((t, tidx) => (
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

      {/* Weekly Focus & Monthly Goal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
        {weeklyFocus.length > 0 && (
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 text-xs block">🎯 Weekly Target Focus:</span>
            <ul className="list-disc list-inside text-slate-700 font-medium space-y-0.5">
              {weeklyFocus.map((wf, idx) => (
                <li key={idx}>{wf}</li>
              ))}
            </ul>
          </div>
        )}

        {monthlyGoal && (
          <div className="p-3.5 bg-violet-50/50 rounded-xl border border-violet-100 space-y-1">
            <span className="font-bold text-violet-950 text-xs block">🚀 30-Day Benchmark Goal:</span>
            <p className="text-violet-900 font-medium leading-relaxed">{monthlyGoal}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudyPlanCard;
