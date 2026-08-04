import React from "react";

function WeakTopicCard({ strongestTopics = [], weakestTopics = [], missingConcepts = [] }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          🔍 Topic Mastery & Gap Detection
        </h3>
        <span className="text-[10px] text-gray-400 font-semibold">Gemini Evaluation</span>
      </div>

      <div className="space-y-4 text-xs">
        {/* Strongest Topics */}
        {strongestTopics.length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-emerald-700 uppercase">
              ✔ Strongest Topics:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {strongestTopics.map((st, idx) => (
                <div key={idx} className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-0.5">
                  <span className="font-bold text-emerald-950 block">{st.topic}</span>
                  <span className="text-[11px] text-emerald-800 font-medium">{st.reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weakest Topics & Improvement Plans */}
        {weakestTopics.length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-rose-700 uppercase">
              ⚠️ Weakest Topics & Recommended Remediation:
            </span>
            <div className="space-y-2">
              {weakestTopics.map((wt, idx) => (
                <div key={idx} className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-950">{wt.topic}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200">
                      Needs Focus
                    </span>
                  </div>
                  <p className="text-[11px] text-rose-900 font-medium">{wt.reason}</p>
                  {wt.improvementPlan && (
                    <div className="p-2 bg-white rounded-lg border border-rose-200/80 text-[11px] text-gray-700 font-medium mt-1">
                      💡 <span className="font-bold text-gray-900">Remediation:</span> {wt.improvementPlan}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Missing Concepts */}
        {missingConcepts.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-gray-100">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Missing High-Frequency Concepts:</span>
            <div className="flex flex-wrap gap-1.5">
              {missingConcepts.map((c, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded text-[10px] font-semibold"
                >
                  + {c}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeakTopicCard;
