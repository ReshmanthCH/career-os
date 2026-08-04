import React from "react";

function TopicCard({ preparation, resumeExpectations }) {
  const prep = preparation || {};
  const resumeExp = resumeExpectations || {};

  const weightages = [
    { name: "Data Structures & Algorithms", pct: prep.dsaWeightage || 50, color: "bg-indigo-600" },
    { name: "Core CS (OS, DBMS, Networks)", pct: prep.coreSubjectsWeightage || 20, color: "bg-violet-600" },
    { name: "Development & Projects", pct: prep.developmentWeightage || 20, color: "bg-emerald-600" },
    { name: "Aptitude & Puzzles", pct: prep.aptitudeWeightage || 10, color: "bg-amber-500" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          🎯 Subject Weightage & Core Expectations
        </h3>
        <span className="text-[10px] text-gray-400 font-semibold">Preparation Focus</span>
      </div>

      {/* Weightages */}
      <div className="space-y-3">
        {weightages.map((w) => (
          <div key={w.name} className="space-y-1 text-xs">
            <div className="flex justify-between font-semibold text-gray-700">
              <span>{w.name}</span>
              <span>{w.pct}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className={`h-full ${w.color} rounded-full`} style={{ width: `${w.pct}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Important Topics */}
      {prep.importantTopics?.length > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs">
          <span className="font-bold text-gray-800 uppercase text-[11px]">High-Frequency DSA Topics:</span>
          <div className="flex flex-wrap gap-1.5">
            {prep.importantTopics.map((t, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-indigo-50 text-indigo-800 border border-indigo-200 rounded-lg font-semibold text-[11px]">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Preferred Technologies */}
      {resumeExp.requiredTechnologies?.length > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs">
          <span className="font-bold text-gray-800 uppercase text-[11px]">Preferred Technologies & Stack:</span>
          <div className="flex flex-wrap gap-1.5">
            {resumeExp.requiredTechnologies.map((tech, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-lg font-semibold text-[11px]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicCard;
