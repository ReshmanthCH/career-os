import React from "react";

function InterviewPrepCard({ interviewAnalysis, companyName }) {
  if (!interviewAnalysis) return null;

  const {
    expectedDifficulty = "Hard",
    likelyDSATopics = [],
    likelyResumeQuestions = [],
    likelyBehavioralQuestions = [],
  } = interviewAnalysis;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center space-x-2">
          <span>🎯 Predicted Interview Questions for {companyName}</span>
        </h3>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
          {expectedDifficulty} Tier
        </span>
      </div>

      <div className="space-y-4 text-xs">
        {/* Likely DSA Topics */}
        {likelyDSATopics.length > 0 && (
          <div className="space-y-1.5">
            <span className="font-bold text-slate-800 uppercase text-[11px]">Primary DSA Topic Focus:</span>
            <div className="flex flex-wrap gap-1.5">
              {likelyDSATopics.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-indigo-50 text-indigo-800 border border-indigo-200 rounded-lg font-semibold text-[11px]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Likely Resume & Project Questions */}
        {likelyResumeQuestions.length > 0 && (
          <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 text-xs block">📄 Likely Resume & Technical Questions:</span>
            <ul className="space-y-1 text-slate-700 font-medium">
              {likelyResumeQuestions.map((q, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>"{q}"</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Likely Behavioral Questions */}
        {likelyBehavioralQuestions.length > 0 && (
          <div className="space-y-1.5 p-3.5 bg-amber-50/60 rounded-xl border border-amber-100">
            <span className="font-bold text-amber-950 text-xs block">💬 Likely Behavioral & Culture Questions:</span>
            <ul className="space-y-1 text-amber-900 font-medium">
              {likelyBehavioralQuestions.map((q, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>"{q}"</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewPrepCard;
