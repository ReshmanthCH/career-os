import React from "react";

function MotivationCard({ motivation }) {
  const quote =
    motivation || "Success is built on daily consistency, not periodic intensity.";

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-200/60 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start space-x-3">
        <div className="text-2xl">✨</div>
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
            Daily Motivation
          </span>
          <p className="text-xs sm:text-sm font-semibold text-amber-950 italic">
            "{quote}"
          </p>
        </div>
      </div>
    </div>
  );
}

export default MotivationCard;
