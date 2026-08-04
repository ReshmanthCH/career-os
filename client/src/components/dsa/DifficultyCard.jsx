import React from "react";
import ProgressBar from "./ProgressBar";

function DifficultyCard({ difficultyDistribution }) {
  const diffs = [
    {
      level: "Easy",
      solved: difficultyDistribution?.Easy?.solved || 0,
      total: difficultyDistribution?.Easy?.total || 0,
      color: "bg-emerald-500",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    {
      level: "Medium",
      solved: difficultyDistribution?.Medium?.solved || 0,
      total: difficultyDistribution?.Medium?.total || 0,
      color: "bg-amber-500",
      badge: "bg-amber-100 text-amber-800 border-amber-200",
    },
    {
      level: "Hard",
      solved: difficultyDistribution?.Hard?.solved || 0,
      total: difficultyDistribution?.Hard?.total || 0,
      color: "bg-rose-500",
      badge: "bg-rose-100 text-rose-800 border-rose-200",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          Difficulty Distribution
        </h3>
        <span className="text-[10px] text-gray-400 font-semibold">Tier Mastery</span>
      </div>

      <div className="space-y-4">
        {diffs.map((d) => {
          const pct = d.total > 0 ? Math.round((d.solved / d.total) * 100) : 0;
          return (
            <div key={d.level} className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${d.badge}`}>
                  {d.level}
                </span>
                <span className="font-semibold text-gray-700">
                  {d.solved} / {d.total} ({pct}%)
                </span>
              </div>
              <ProgressBar percentage={pct} colorClass={d.color} height="h-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DifficultyCard;
