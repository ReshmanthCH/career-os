import React from "react";

function LoadingState({ message = "Analyzing resume structure..." }) {
  return (
    <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center space-y-4 shadow-sm max-w-lg mx-auto">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-sm font-semibold text-gray-800">{message}</p>
      <p className="text-xs text-gray-400">Running ATS section audits and skill extraction engine...</p>
    </div>
  );
}

export default LoadingState;
