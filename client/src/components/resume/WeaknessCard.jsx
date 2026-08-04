import React from "react";

function WeaknessCard({ weaknesses = [], missingSections = [] }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center space-x-1.5">
          <span>⚠️ Identified Weaknesses & Gaps</span>
        </h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
          {weaknesses.length + missingSections.length} Items
        </span>
      </div>

      <div className="space-y-3">
        {weaknesses.length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Critical Weaknesses:</span>
            {weaknesses.map((w, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-rose-950">
                <span className="text-rose-500 font-bold flex-shrink-0 mt-0.5">!</span>
                <span className="leading-relaxed font-medium">{w}</span>
              </div>
            ))}
          </div>
        )}

        {missingSections.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-gray-100">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Missing Sections:</span>
            <div className="flex flex-wrap gap-1.5">
              {missingSections.map((sec) => (
                <span
                  key={sec}
                  className="px-2.5 py-0.5 bg-rose-50 text-rose-800 border border-rose-200 rounded text-[10px] font-semibold"
                >
                  + {sec}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeaknessCard;
