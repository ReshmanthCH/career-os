import React from "react";

function CareerAnalysisCard({ analysis, onGenerate, isGenerating }) {
  if (!analysis) {
    return (
      <div className="bg-white rounded-2xl p-10 border border-gray-200 text-center space-y-4 shadow-sm max-w-lg mx-auto">
        <span className="text-4xl block">📊</span>
        <h3 className="text-lg font-bold text-gray-900">360° Career Readiness Evaluation</h3>
        <p className="text-xs text-gray-500">
          Run Gemini AI reasoning over your complete profile, resume score, DSA stats, GitHub repos, and company goals.
        </p>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-xs rounded-xl shadow transition"
        >
          {isGenerating ? "🧠 Evaluating..." : "✨ Run 360° Career Evaluation"}
        </button>
      </div>
    );
  }

  const {
    overallReadiness = 0,
    placementReadiness = 0,
    resumeReadiness = 0,
    dsaReadiness = 0,
    projectReadiness = 0,
    interviewReadiness = 0,
    learningVelocity = "Moderate",
    consistencyScore = 70,
    executiveSummary = "",
    strengths = [],
    weakAreas = [],
    targetCompanyFit = [],
    actionPlan = {},
  } = analysis;

  const gauges = [
    { label: "Overall Career Readiness", score: overallReadiness, color: "from-indigo-600 to-violet-600" },
    { label: "Placement Readiness", score: placementReadiness, color: "from-violet-600 to-purple-600" },
    { label: "Resume Readiness", score: resumeReadiness, color: "from-blue-600 to-cyan-600" },
    { label: "DSA Readiness", score: dsaReadiness, color: "from-emerald-600 to-teal-600" },
    { label: "Project Readiness", score: projectReadiness, color: "from-amber-500 to-orange-600" },
    { label: "Interview Readiness", score: interviewReadiness, color: "from-rose-600 to-pink-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">360° Career Readiness Index</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Gemini AI evaluation across your resume, DSA, GitHub, and target companies.
          </p>
        </div>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 text-xs font-bold rounded-xl transition disabled:opacity-50"
        >
          {isGenerating ? "Refreshing..." : "🔄 Refresh Analysis"}
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-sm space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 px-2.5 py-1 rounded">
          Executive Career Verdict
        </span>
        <p className="text-xs sm:text-sm font-medium leading-relaxed">
          "{executiveSummary}"
        </p>
      </div>

      {/* Gauges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {gauges.map((g, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-2 text-center">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
              {g.label}
            </span>
            <div className={`text-2xl font-black bg-gradient-to-r ${g.color} bg-clip-text text-transparent`}>
              {g.score}%
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${g.color}`}
                style={{ width: `${g.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Metrics Row: Velocity & Consistency */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-950 block">🚀 Learning Velocity:</span>
            <span className="text-lg font-black text-emerald-800">{learningVelocity}</span>
          </div>
          <span className="text-2xl">⚡</span>
        </div>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-indigo-950 block">🔥 Consistency Score:</span>
            <span className="text-lg font-black text-indigo-800">{consistencyScore}/100</span>
          </div>
          <span className="text-2xl">🎯</span>
        </div>
      </div>

      {/* Strengths vs Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            ✅ Strategic Strengths
          </h3>
          <ul className="space-y-1.5 text-xs text-gray-700 font-medium">
            {strengths.map((s, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-rose-800 uppercase tracking-wider">
            ⚠️ Critical Growth Areas
          </h3>
          <ul className="space-y-1.5 text-xs text-gray-700 font-medium">
            {weakAreas.map((w, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CareerAnalysisCard;
