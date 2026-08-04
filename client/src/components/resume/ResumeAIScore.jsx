import React from "react";

function ResumeAIScore({ overallScore = 0, atsScore = 0, version = "rule-based" }) {
  const isAIPowered = version === "ai-v1";

  const getScoreBadge = (score) => {
    if (score >= 85) return { label: "Top Tier Candidate", color: "bg-emerald-100 text-emerald-800 border-emerald-200" };
    if (score >= 70) return { label: "Strong Technical Profile", color: "bg-indigo-100 text-indigo-800 border-indigo-200" };
    if (score >= 55) return { label: "Competitive Candidate", color: "bg-amber-100 text-amber-800 border-amber-200" };
    return { label: "Needs Optimization", color: "bg-rose-100 text-rose-800 border-rose-200" };
  };

  const badge = getScoreBadge(overallScore);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center space-x-2">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            AI Evaluation Index
          </h3>
          {isAIPowered ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm">
              ✨ Gemini AI Powered
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
              ⚙ Rule-Based Engine
            </span>
          )}
        </div>

        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.color}`}>
          {badge.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        {/* Overall Score */}
        <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100 flex flex-col items-center justify-center space-y-1">
          <span className="text-3xl font-extrabold text-indigo-900">{overallScore}</span>
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
            Overall Quality
          </span>
        </div>

        {/* ATS Score */}
        <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center space-y-1">
          <span className="text-3xl font-extrabold text-emerald-900">{atsScore}</span>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
            ATS Compatibility
          </span>
        </div>
      </div>
    </div>
  );
}

export default ResumeAIScore;
