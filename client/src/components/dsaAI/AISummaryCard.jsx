import React from "react";

function AISummaryCard({ overallAssessment, version = "gemini-2.5-flash" }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center space-x-2">
          <span className="text-xl">✨</span>
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            AI Recruiter Executive Summary
          </h3>
        </div>
        <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm">
          Gemini AI Powered
        </span>
      </div>

      <p className="text-xs sm:text-sm font-medium leading-relaxed text-gray-700 bg-indigo-50/40 p-4 rounded-xl border border-indigo-100/80">
        "{overallAssessment || "Generate AI evaluation to get a Silicon Valley recruiter assessment of your DSA standing."}"
      </p>
    </div>
  );
}

export default AISummaryCard;
