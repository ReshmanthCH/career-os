import React from "react";

function ProgressBar({ percentage = 0, colorClass = "bg-indigo-600", height = "h-2" }) {
  const clamped = Math.min(100, Math.max(0, percentage));
  return (
    <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${height}`}>
      <div
        className={`h-full ${colorClass} transition-all duration-300 rounded-full`}
        style={{ width: `${clamped}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
