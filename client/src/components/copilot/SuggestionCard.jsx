import React from "react";

function SuggestionCard({ onSelectPrompt }) {
  const suggestions = [
    { title: "Am I ready for Amazon?", icon: "🏢", category: "Target Company" },
    { title: "Analyze my resume & ATS score", icon: "📄", category: "Resume" },
    { title: "What project should I build next?", icon: "💻", category: "Projects" },
    { title: "Review my DSA progress", icon: "📊", category: "DSA" },
    { title: "What should I study today?", icon: "🎯", category: "Daily Plan" },
    { title: "How do I improve placement chances?", icon: "🚀", category: "Strategy" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {suggestions.map((s, idx) => (
        <button
          key={idx}
          onClick={() => onSelectPrompt(s.title)}
          className="p-3.5 bg-white border border-gray-200 hover:border-indigo-400 hover:shadow-md rounded-xl text-left transition space-y-1 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg">{s.icon}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded group-hover:bg-indigo-50 group-hover:text-indigo-700">
              {s.category}
            </span>
          </div>
          <p className="text-xs font-bold text-gray-800 group-hover:text-indigo-600 transition">
            "{s.title}"
          </p>
        </button>
      ))}
    </div>
  );
}

export default SuggestionCard;
