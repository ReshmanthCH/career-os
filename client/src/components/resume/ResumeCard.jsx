import React from "react";

function ResumeCard({ resume, onDelete, onReplaceClick, onReAnalyze, isAnalyzing }) {
  if (!resume) return null;

  const formattedDate = new Date(resume.uploadDate || resume.createdAt).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  const fileSizeMB = (resume.fileSize / (1024 * 1024)).toFixed(2);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl text-indigo-600 font-bold shadow-sm">
          {resume.fileType === "docx" ? "📝" : "📄"}
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-gray-900 text-sm">{resume.originalName}</h3>
            <span className="uppercase text-[9px] font-extrabold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
              {resume.fileType}
            </span>
          </div>

          <p className="text-xs text-gray-400">
            Uploaded on {formattedDate} • {fileSizeMB} MB
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
        <button
          onClick={onReAnalyze}
          disabled={isAnalyzing}
          className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold text-xs rounded-lg transition border border-indigo-200"
        >
          {isAnalyzing ? "Analyzing..." : "⚡ Re-analyze"}
        </button>

        <button
          onClick={onReplaceClick}
          className="px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold text-xs rounded-lg transition border border-gray-200"
        >
          Replace
        </button>

        <button
          onClick={onDelete}
          className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 font-semibold text-xs rounded-lg transition border border-red-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ResumeCard;
