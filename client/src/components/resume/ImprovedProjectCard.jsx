import React from "react";

function ImprovedProjectCard({ improvedProjects = [] }) {
  if (!improvedProjects || improvedProjects.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center space-x-2">
          <span>🎯 Metric-Driven Project Rewrites</span>
        </h3>
        <span className="text-[10px] text-gray-400 font-semibold">ATS Optimized</span>
      </div>

      <div className="space-y-4">
        {improvedProjects.map((proj, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
              {proj.title || `Project #${idx + 1}`}
            </h4>

            {proj.original && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Original Snippet:</span>
                <p className="text-xs text-gray-500 line-through bg-white p-2.5 rounded-lg border border-gray-200">
                  {proj.original}
                </p>
              </div>
            )}

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-600 uppercase flex items-center space-x-1">
                <span>✔ AI ATS Enhanced Version:</span>
              </span>
              <p className="text-xs font-semibold text-emerald-950 bg-emerald-50/70 p-3 rounded-lg border border-emerald-200 leading-relaxed">
                {proj.improved}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImprovedProjectCard;
