import React from "react";

function RecommendationCard({ recommendations, onGenerate, isGenerating }) {
  if (!recommendations || !recommendations.items || recommendations.items.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 border border-gray-200 text-center space-y-4 shadow-sm max-w-lg mx-auto">
        <span className="text-4xl block">💡</span>
        <h3 className="text-lg font-bold text-gray-900">Personalized Action Recommendations</h3>
        <p className="text-xs text-gray-500">
          Get targeted, metric-driven recommendations for your resume, DSA, GitHub repos, and company applications.
        </p>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-xs rounded-xl shadow transition"
        >
          {isGenerating ? "🧠 Generating..." : "✨ Generate Action Recommendations"}
        </button>
      </div>
    );
  }

  const { items = [], summaryNote = "" } = recommendations;

  const priorityColors = {
    Critical: "bg-rose-100 text-rose-800 border-rose-200",
    High: "bg-amber-100 text-amber-800 border-amber-200",
    Medium: "bg-indigo-100 text-indigo-800 border-indigo-200",
    Low: "bg-slate-100 text-slate-800 border-slate-200",
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">Recommendation Center</h2>
          {summaryNote && <p className="text-xs text-gray-500 mt-1 font-medium">"{summaryNote}"</p>}
        </div>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow transition disabled:opacity-50"
        >
          {isGenerating ? "Refreshing..." : "🔄 Refresh Suggestions"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                {item.category}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${priorityColors[item.priority] || priorityColors.Medium}`}>
                {item.priority} Priority
              </span>
            </div>

            <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">{item.rationale}</p>

            {item.actionItems && item.actionItems.length > 0 && (
              <div className="pt-2 border-t border-gray-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-indigo-900 block">Action Items:</span>
                <ul className="space-y-1 text-xs text-gray-700 font-medium">
                  {item.actionItems.map((act, aidx) => (
                    <li key={aidx} className="flex items-start space-x-1.5">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendationCard;
