import React from "react";

function BasicDetailsStep({ formData, onChange }) {
  const currentYearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduated"];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Step 1: Academic & Basic Details</h3>
        <p className="text-xs text-gray-500 mt-1">Tell us about your educational background.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* College */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            College / University Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.college}
            onChange={(e) => onChange("college", e.target.value)}
            placeholder="e.g. Stanford University or National Institute of Technology"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Degree & Branch Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Degree <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.degree}
              onChange={(e) => onChange("degree", e.target.value)}
              placeholder="e.g. B.Tech, B.E., B.S., MCA"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Branch / Major <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.branch}
              onChange={(e) => onChange("branch", e.target.value)}
              placeholder="e.g. Computer Science, Information Technology"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Current Year & Graduation Year Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Current Academic Year <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.currentYear}
              onChange={(e) => onChange("currentYear", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              {currentYearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Expected Graduation Year <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min="2020"
              max="2035"
              value={formData.graduationYear}
              onChange={(e) => onChange("graduationYear", e.target.value)}
              placeholder="e.g. 2026"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicDetailsStep;
