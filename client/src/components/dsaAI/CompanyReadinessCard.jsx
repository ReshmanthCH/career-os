import React from "react";

function CompanyReadinessCard({ companyReadiness = [] }) {
  if (!companyReadiness || companyReadiness.length === 0) return null;

  const getStatusBadge = (score) => {
    if (score >= 75) return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (score >= 60) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-rose-100 text-rose-800 border-rose-200";
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          🏢 Target Company Readiness Matrix
        </h3>
        <span className="text-[10px] text-gray-400 font-semibold">Tier 1 Target Tailoring</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {companyReadiness.map((comp) => (
          <div key={comp.company} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-extrabold text-sm text-slate-900">{comp.company}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${getStatusBadge(comp.readinessScore)}`}>
                  {comp.readinessScore}% Match
                </span>
              </div>

              {comp.importantTopics?.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Core Focus Topics:</span>
                  <div className="flex flex-wrap gap-1">
                    {comp.importantTopics.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-medium text-gray-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {comp.missingSkills?.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-rose-500 uppercase">Missing Skill Gaps:</span>
                  <div className="flex flex-wrap gap-1">
                    {comp.missingSkills.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-800 rounded text-[10px] font-semibold">
                        ! {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-200 text-[10px] font-semibold text-slate-500 flex items-center justify-between">
              <span>Estimated Timeline:</span>
              <span className="text-slate-800 font-bold">{comp.timeline}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyReadinessCard;
