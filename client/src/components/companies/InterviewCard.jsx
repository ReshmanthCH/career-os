import React from "react";

function InterviewCard({ interviewProcess }) {
  if (!interviewProcess) return null;

  const rounds = [
    { name: "Online Assessment", val: interviewProcess.onlineAssessment || "2 DSA Problems + MCQs", icon: "💻" },
    { name: "Technical Rounds", val: `${interviewProcess.technicalRounds || 3} Rounds`, icon: "⚡" },
    { name: "System Design", val: interviewProcess.systemDesignRequired ? "Required (HLD/LLD)" : "Not Required for Freshers", icon: "🏗️" },
    { name: "Behavioral & HR", val: interviewProcess.behavioralInterview ? "Required (Cultural Fit)" : "Standard HR", icon: "💬" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          📝 Interview Process & Round Structure
        </h3>
        <span className="text-[10px] text-gray-400 font-semibold">Standard Hiring Pipeline</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {rounds.map((r) => (
          <div key={r.name} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <div className="flex items-center space-x-2 font-bold text-slate-900">
              <span>{r.icon}</span>
              <span>{r.name}</span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed pl-6">{r.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InterviewCard;
