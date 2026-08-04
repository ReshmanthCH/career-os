import React from "react";

function ATSCard({ recruiterImpression, atsScore }) {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <span className="text-xl">👔</span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300">
            Recruiter & ATS Impression
          </h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 border border-indigo-400/30 text-indigo-200">
          ATS Score: {atsScore}/100
        </span>
      </div>

      <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-200 italic">
        "{recruiterImpression || "Strong technical foundation aligned with software engineering role standards."}"
      </p>
    </div>
  );
}

export default ATSCard;
