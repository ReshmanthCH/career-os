import React from "react";

function WelcomeStep({ userName, onStart }) {
  return (
    <div className="text-center py-6 space-y-6">
      <div className="mx-auto w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl font-extrabold shadow-sm">
        🎓
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome to CareerOS, {userName || "Student"}!
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto text-sm leading-relaxed">
          Let's set up your student profile in less than 2 minutes. This information helps us tailor your placement preparation, skill tracking, and career roadmap.
        </p>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-left max-w-md mx-auto space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900">What we'll collect:</h4>
        <ul className="text-xs text-indigo-700 space-y-1.5 list-disc list-inside">
          <li>Basic academic details (College, Degree, Graduation Year)</li>
          <li>Career target & placement goals</li>
          <li>Current self-assessed skill levels</li>
          <li>Coding profiles & social links (optional)</li>
        </ul>
      </div>

      <div>
        <button
          onClick={onStart}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 focus:outline-none"
        >
          Start Onboarding &rarr;
        </button>
      </div>
    </div>
  );
}

export default WelcomeStep;
