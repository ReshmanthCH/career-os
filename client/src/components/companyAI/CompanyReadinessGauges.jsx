import React from "react";

function CompanyReadinessGauges({ report }) {
  if (!report) return null;

  const factors = [
    { title: "Overall Hiring Match", score: report.overallReadiness || 0, badge: "Target: 75%+", color: "bg-indigo-600" },
    { title: "Resume Fit", score: report.resumeReadiness || 0, badge: "ATS & Projects", color: "bg-emerald-600" },
    { title: "DSA Preparation", score: report.dsaReadiness || 0, badge: "Problem Solving", color: "bg-violet-600" },
    { title: "Project Portfolio", score: report.projectReadiness || 0, badge: "Domain Relevance", color: "bg-blue-600" },
    { title: "GitHub Activity", score: report.githubReadiness || 0, badge: "Code Quality", color: "bg-amber-600" },
    { title: "Core CS Subjects", score: report.coreCSReadiness || 0, badge: "OS/DBMS/CN", color: "bg-teal-600" },
    { title: "Interview Readiness", score: report.interviewReadiness || 0, badge: "Technical Rounds", color: "bg-rose-600" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          📊 7-Factor AI Hiring Readiness Index
        </h3>
        <span className="text-[10px] text-gray-400 font-semibold">Matched for {report.companyName}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
        {factors.map((f) => (
          <div key={f.title} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900">{f.score}%</div>
            <div className="text-[10px] font-bold text-slate-700 leading-tight truncate">{f.title}</div>
            <div className="text-[8px] font-semibold text-slate-400 uppercase">{f.badge}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyReadinessGauges;
