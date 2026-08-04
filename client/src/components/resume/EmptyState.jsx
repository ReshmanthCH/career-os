import React from "react";

function EmptyState({ onUploadClick }) {
  return (
    <div className="bg-white rounded-2xl p-10 border-2 border-dashed border-gray-200 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto shadow-inner">
        📄
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-bold text-gray-900">No Resume Uploaded Yet</h3>
        <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
          Upload your resume in PDF or DOCX format to receive instant ATS compatibility analysis, section audits, and personalized scoring.
        </p>
      </div>

      <div>
        <button
          onClick={onUploadClick}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
        >
          Upload Your Resume &rarr;
        </button>
      </div>
    </div>
  );
}

export default EmptyState;
