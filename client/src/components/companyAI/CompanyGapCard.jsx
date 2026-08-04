import React from "react";

function CompanyGapCard({ gapAnalysis, companyName }) {
  if (!gapAnalysis) return null;

  const {
    missingDSATopics = [],
    missingProjects = [],
    missingTechnologies = [],
    weakAreas = [],
    strongAreas = [],
  } = gapAnalysis;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          🔍 Profile Gap Analysis & Remediation
        </h3>
        <span className="text-[10px] text-gray-400 font-semibold">Requirements vs Current Profile</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* Missing DSA Topics */}
        {missingDSATopics.length > 0 && (
          <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-100 space-y-1.5">
            <span className="font-bold text-rose-950 text-xs block">⚠️ Missing DSA Topics:</span>
            <ul className="space-y-1 text-rose-900 font-medium">
              {missingDSATopics.map((t, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Missing Projects & Tech */}
        {(missingProjects.length > 0 || missingTechnologies.length > 0) && (
          <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-100 space-y-1.5">
            <span className="font-bold text-amber-950 text-xs block">📦 Missing Projects & Tech Stack:</span>
            <ul className="space-y-1 text-amber-900 font-medium">
              {missingProjects.map((p, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{p}</span>
                </li>
              ))}
              {missingTechnologies.map((tech, idx) => (
                <li key={`tech-${idx}`} className="flex items-start space-x-1.5">
                  <span className="text-amber-600 font-bold">• Tech:</span>
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Weak Areas */}
        {weakAreas.length > 0 && (
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 text-xs block">⚡ Weak Skill Areas:</span>
            <ul className="space-y-1 text-slate-700 font-medium">
              {weakAreas.map((w, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Strong Areas */}
        {strongAreas.length > 0 && (
          <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1.5">
            <span className="font-bold text-emerald-950 text-xs block">✔ Key Competitive Strengths:</span>
            <ul className="space-y-1 text-emerald-900 font-medium">
              {strongAreas.map((s, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyGapCard;
