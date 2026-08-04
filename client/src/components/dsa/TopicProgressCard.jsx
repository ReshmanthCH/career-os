import React from "react";
import ProgressBar from "./ProgressBar";

function TopicProgressCard({ topicWiseProgress = [] }) {
  const activeTopics = topicWiseProgress.filter((t) => t.total > 0);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          Topic-Wise Mastery Breakdown
        </h3>
        <span className="text-[10px] text-gray-400 font-semibold">
          {activeTopics.length} Active Topics
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-80 overflow-y-auto pr-1">
        {topicWiseProgress.map((t) => (
          <div key={t.topic} className="p-3 bg-gray-50/70 rounded-xl border border-gray-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-800">{t.topic}</span>
              <span className="text-[11px] font-semibold text-gray-500">
                {t.solved}/{t.total} ({t.percentage}%)
              </span>
            </div>
            <ProgressBar percentage={t.percentage} colorClass="bg-indigo-600" height="h-1.5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopicProgressCard;
