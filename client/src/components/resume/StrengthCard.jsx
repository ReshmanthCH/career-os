import React from "react";

function StrengthCard({ strengths = [] }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center space-x-1.5">
          <span>✔ Identified Strengths</span>
        </h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
          {strengths.length} Detected
        </span>
      </div>

      <div className="space-y-2.5">
        {strengths.length > 0 ? (
          strengths.map((str, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs text-gray-700">
              <span className="text-emerald-500 font-bold flex-shrink-0 mt-0.5">✓</span>
              <span className="leading-relaxed font-medium">{str.replace(/^✔\s*/, "")}</span>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400">No specific strengths detected yet.</p>
        )}
      </div>
    </div>
  );
}

export default StrengthCard;
