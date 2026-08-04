import React from "react";

function ImprovementCard({ projectSuggestions = [], skillSuggestions = [], grammarSuggestions = [] }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          💡 Smart Action Improvements
        </h3>
        <span className="text-[10px] text-indigo-600 font-bold">AI Recommended</span>
      </div>

      <div className="space-y-4 text-xs">
        {/* Project Suggestions */}
        {projectSuggestions.length > 0 && (
          <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1.5">
            <span className="font-bold text-indigo-900 text-xs flex items-center space-x-1">
              <span>🚀 Project Portfolio Enhancements:</span>
            </span>
            <ul className="list-disc list-inside space-y-1 text-gray-700 font-medium">
              {projectSuggestions.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Skill Suggestions */}
        {skillSuggestions.length > 0 && (
          <div className="p-3.5 bg-violet-50/50 rounded-xl border border-violet-100 space-y-1.5">
            <span className="font-bold text-violet-900 text-xs flex items-center space-x-1">
              <span>⚡ Skill Matrix Recommendations:</span>
            </span>
            <ul className="list-disc list-inside space-y-1 text-gray-700 font-medium">
              {skillSuggestions.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Grammar & Phrasing Suggestions */}
        {grammarSuggestions.length > 0 && (
          <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1.5">
            <span className="font-bold text-emerald-900 text-xs flex items-center space-x-1">
              <span>✍️ Action Verbs & Grammar Phrasing:</span>
            </span>
            <ul className="list-disc list-inside space-y-1 text-gray-700 font-medium">
              {grammarSuggestions.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImprovementCard;
