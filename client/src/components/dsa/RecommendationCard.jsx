import React from "react";

function RecommendationCard({ recommendations = [] }) {
  const getBadgeClass = (type) => {
    switch (type) {
      case "priority":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "warning":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "success":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center space-x-1.5">
          <span>💡 Smart DSA Recommendations</span>
        </h3>
        <span className="text-[10px] text-indigo-600 font-bold">Rule Engine Active</span>
      </div>

      <div className="space-y-3">
        {recommendations.length > 0 ? (
          recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{rec.title}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold border ${getBadgeClass(rec.type)}`}>
                  {rec.type.toUpperCase()}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium">{rec.message}</p>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400">No specific recommendations yet. Log more problems to get active insights.</p>
        )}
      </div>
    </div>
  );
}

export default RecommendationCard;
