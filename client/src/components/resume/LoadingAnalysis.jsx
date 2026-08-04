import React from "react";

function LoadingAnalysis({ message = "Extracting text & running Gemini AI analysis..." }) {
  return (
    <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center space-y-4 shadow-sm max-w-lg mx-auto">
      <div className="relative w-16 h-16 mx-auto">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-bold text-gray-900">{message}</p>
        <p className="text-xs text-gray-400">
          Comparing skills, formatting, and ATS metrics against recruiter standards...
        </p>
      </div>
    </div>
  );
}

export default LoadingAnalysis;
