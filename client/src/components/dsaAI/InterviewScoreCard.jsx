import React from "react";

function InterviewScoreCard({ report }) {
  const scores = [
    {
      title: "Interview Readiness",
      score: report?.interviewReadinessScore || 0,
      color: "from-indigo-500 to-violet-600",
      badge: "Target: 80%+",
    },
    {
      title: "Coding Confidence",
      score: report?.codingConfidence || 0,
      color: "from-emerald-500 to-teal-600",
      badge: "Implementation",
    },
    {
      title: "Problem Solving",
      score: report?.problemSolvingConfidence || 0,
      color: "from-blue-500 to-cyan-600",
      badge: "Pattern Matching",
    },
    {
      title: "Revision Readiness",
      score: report?.revisionReadiness || 0,
      color: "from-amber-500 to-orange-600",
      badge: "Spaced Retention",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          AI Interview Readiness Index
        </h3>
        <span className="text-[10px] text-gray-400 font-semibold">5-Factor Metric Engine</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        {scores.map((sc) => (
          <div key={sc.title} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{sc.score}%</div>
            <div className="text-[11px] font-bold text-slate-700">{sc.title}</div>
            <div className="text-[9px] font-semibold text-slate-400 uppercase">{sc.badge}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InterviewScoreCard;
