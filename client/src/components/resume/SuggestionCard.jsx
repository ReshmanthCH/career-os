import React from "react";

function SuggestionCard({ suggestions = [] }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center space-x-1.5">
          <span>💡 Areas for Improvement</span>
        </h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
          {suggestions.length} Action Items
        </span>
      </div>

      <div className="space-y-2.5">
        {suggestions.length > 0 ? (
          suggestions.map((sug, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs text-gray-700">
              <span className="text-amber-500 font-bold flex-shrink-0 mt-0.5">•</span>
              <span className="leading-relaxed font-medium">{sug.replace(/^•\s*/, "")}</span>
            </div>
          ))
        ) : (
          <p className="text-xs text-emerald-600 font-semibold">
            🎉 Great job! No critical improvements required.
          </p>
        )}
      </div>
    </div>
  );
}

export default SuggestionCard;
