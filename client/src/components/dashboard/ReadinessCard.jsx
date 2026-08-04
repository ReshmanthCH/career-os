import React from "react";

function ReadinessCard({ readiness }) {
  const score = readiness?.score || 0;
  const recommendation = readiness?.recommendation || "Complete your profile to view readiness.";

  const getScoreColor = (val) => {
    if (val >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (val >= 60) return "text-indigo-600 bg-indigo-50 border-indigo-200";
    if (val >= 40) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  const getScoreBadge = (val) => {
    if (val >= 80) return "High Placement Readiness";
    if (val >= 60) return "Good Progress";
    if (val >= 40) return "Moderate Preparation";
    return "Needs Immediate Action";
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Career Readiness Index
        </h2>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getScoreColor(score)}`}>
          {getScoreBadge(score)}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Score Ring / Metric */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-indigo-50 to-violet-50 border-4 border-indigo-100 shadow-inner">
          <span className="text-3xl font-extrabold text-indigo-900">{score}</span>
          <span className="text-[10px] font-semibold uppercase text-gray-400">out of 100</span>
        </div>

        {/* Details & Recommendation */}
        <div className="flex-1 space-y-3 w-full">
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
              <span>Readiness Progress</span>
              <span>{score}%</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 transition-all duration-500"
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              💡 Action Recommendation:
            </span>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              {recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadinessCard;
