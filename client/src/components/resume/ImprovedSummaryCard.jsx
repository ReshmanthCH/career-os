import { useState } from "react";

function ImprovedSummaryCard({ improvedSummary }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!improvedSummary) return;
    navigator.clipboard.writeText(improvedSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!improvedSummary) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center space-x-2">
          <span className="text-xl">✨</span>
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            AI-Enhanced Professional Summary
          </h3>
        </div>

        <button
          onClick={handleCopy}
          className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-lg transition border border-indigo-200"
        >
          {copied ? "Copied! ✓" : "Copy Summary"}
        </button>
      </div>

      <div className="p-4 bg-gradient-to-r from-indigo-50/50 to-violet-50/50 rounded-xl border border-indigo-100 text-xs text-indigo-950 font-medium leading-relaxed">
        "{improvedSummary}"
      </div>
    </div>
  );
}

export default ImprovedSummaryCard;
