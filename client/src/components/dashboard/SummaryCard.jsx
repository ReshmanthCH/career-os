import React from "react";

function SummaryCard({ profile }) {
  const dreamCompanies = profile?.dreamCompanies || [];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Career Objectives Summary
        </h2>
        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* Target Role */}
        <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
          <span className="text-gray-500 font-semibold block text-[10px] uppercase">Target Role</span>
          <span className="font-bold text-indigo-900 text-sm">{profile?.targetRole || "N/A"}</span>
        </div>

        {/* Preferred Domain */}
        <div className="p-3 bg-violet-50/50 rounded-xl border border-violet-100">
          <span className="text-gray-500 font-semibold block text-[10px] uppercase">Preferred Domain</span>
          <span className="font-bold text-violet-900 text-xs">{profile?.preferredDomain || "N/A"}</span>
        </div>

        {/* Graduation Year */}
        <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
          <span className="text-gray-500 font-semibold block text-[10px] uppercase">Graduation Year</span>
          <span className="font-bold text-emerald-900 text-xs">{profile?.graduationYear || "N/A"}</span>
        </div>

        {/* Placement Goal */}
        <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
          <span className="text-gray-500 font-semibold block text-[10px] uppercase">Placement Goal</span>
          <span className="font-bold text-blue-900 text-xs">{profile?.placementGoal || "N/A"}</span>
        </div>
      </div>

      {/* Dream Companies */}
      <div className="pt-2 border-t border-gray-100">
        <span className="text-gray-500 font-semibold text-[10px] uppercase block mb-1.5">
          Dream Companies
        </span>
        <div className="flex flex-wrap gap-1.5">
          {dreamCompanies.length > 0 ? (
            dreamCompanies.map((company) => (
              <span
                key={company}
                className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-medium border border-gray-200 transition"
              >
                🏢 {company}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400">No dream companies added yet.</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
