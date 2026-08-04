import React from "react";

function CareerGoalsStep({ formData, onChange }) {
  const placementGoalOptions = [
    "Product Based Company (FAANG / Unicorns)",
    "Service Based Company",
    "High Growth Startup",
    "Higher Studies / Research",
    "Other",
  ];

  const domainOptions = [
    "Web Development (Full Stack / Frontend / Backend)",
    "Artificial Intelligence & Machine Learning",
    "Data Science & Analytics",
    "Cloud Computing & DevOps",
    "Cybersecurity",
    "Mobile App Development",
    "Core Software Engineering",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Step 2: Career Goals & Aspirations</h3>
        <p className="text-xs text-gray-500 mt-1">Define your career target so we can curate your roadmap.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Target Role */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Target Job Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.targetRole}
            onChange={(e) => onChange("targetRole", e.target.value)}
            placeholder="e.g. SDE-1, Full Stack Developer, Frontend Engineer, AI Engineer"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Placement Goal */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Placement Goal <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.placementGoal}
            onChange={(e) => onChange("placementGoal", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
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
            Preferred Domain <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.preferredDomain}
            onChange={(e) => onChange("preferredDomain", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
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
            Dream Companies (comma separated)
          </label>
          <input
            type="text"
            value={formData.dreamCompaniesInput || ""}
            onChange={(e) => onChange("dreamCompaniesInput", e.target.value)}
            placeholder="e.g. Google, Microsoft, Amazon, Atlassian, Uber"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p className="text-[11px] text-gray-400 mt-1">Separate multiple companies with commas.</p>
        </div>
      </div>
    </div>
  );
}

export default CareerGoalsStep;
