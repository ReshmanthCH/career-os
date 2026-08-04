import React from "react";

function ResumeScore({ score = 0 }) {
  const getBadge = (val) => {
    if (val >= 85) return { label: "Excellent ATS Match", color: "bg-emerald-100 text-emerald-800 border-emerald-200" };
    if (val >= 70) return { label: "Good Structure", color: "bg-indigo-100 text-indigo-800 border-indigo-200" };
    if (val >= 50) return { label: "Moderate ATS Match", color: "bg-amber-100 text-amber-800 border-amber-200" };
    return { label: "Needs Improvement", color: "bg-rose-100 text-rose-800 border-rose-200" };
  };

  const badge = getBadge(score);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col items-center justify-center space-y-4 text-center">
      <div className="flex items-center justify-between w-full border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          Resume ATS Score
        </h3>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.color}`}>
          {badge.label}
        </span>
      </div>

      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-50 to-violet-50 border-4 border-indigo-100 shadow-inner flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold text-indigo-900">{score}</span>
        <span className="text-[10px] font-semibold uppercase text-gray-400">out of 100</span>
      </div>

      <div className="w-full space-y-1">
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-500"
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <p className="text-[11px] text-gray-400">Rule-based ATS scoring benchmark</p>
      </div>
    </div>
  );
}

export default ResumeScore;
