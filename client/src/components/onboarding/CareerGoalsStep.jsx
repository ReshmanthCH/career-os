import React from "react";

function CareerGoalsStep({ formData, onChange }) {
  const targetRoleOptions = [
    "Software Development Engineer (SDE)",
    "Backend Engineer",
    "Full Stack Engineer",
    "Frontend Engineer",
    "AI / ML Engineer",
    "Systems / Infrastructure Engineer",
    "Mobile Development Engineer (iOS / Android)",
  ];

  const placementGoalOptions = [
    "Product Based Company (FAANG / Tier-1 Tech / Unicorns)",
    "High Growth Tech Startup",
    "Top Software R&D Labs",
  ];

  const domainOptions = [
    "Software Engineering (DSA & Problem Solving)",
    "Web Development (Full Stack / Frontend / Backend)",
    "Artificial Intelligence & Machine Learning",
    "Cloud & Distributed Systems Engineering",
    "Mobile App Development",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Step 2: Engineering Career Goals</h3>
        <p className="text-xs text-gray-500 mt-1">Select your target software development role and core engineering domain.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Target Role */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Target Job Role <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.targetRole || targetRoleOptions[0]}
            onChange={(e) => onChange("targetRole", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white font-medium"
          >
            {targetRoleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Placement Goal */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Placement Target <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.placementGoal || placementGoalOptions[0]}
            onChange={(e) => onChange("placementGoal", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white font-medium"
          >
            {placementGoalOptions.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Domain */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Preferred Development Domain <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.preferredDomain || domainOptions[0]}
            onChange={(e) => onChange("preferredDomain", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white font-medium"
          >
            {domainOptions.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>

        {/* Dream Companies */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Dream Tech Companies (comma separated)
          </label>
          <input
            type="text"
            value={formData.dreamCompaniesInput || ""}
            onChange={(e) => onChange("dreamCompaniesInput", e.target.value)}
            placeholder="e.g. Google, Microsoft, Amazon, NVIDIA, Uber"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p className="text-[11px] text-gray-400 mt-1">Separate multiple companies with commas.</p>
        </div>
      </div>
    </div>
  );
}

export default CareerGoalsStep;
