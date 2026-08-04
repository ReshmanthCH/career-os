import React from "react";

function SkillAssessmentStep({ formData, onChange }) {
  const skillCategories = [
    { id: "dsa", label: "Data Structures & Algorithms (DSA)" },
    { id: "programming", label: "Programming Proficiency (C++ / Java / Python / JS)" },
    { id: "webDev", label: "Web Development (HTML/CSS/JS/React/Node)" },
    { id: "coreCS", label: "Core CS Fundamentals (OS, DBMS, CN, OOP)" },
    { id: "aiMl", label: "AI / ML Fundamentals" },
  ];

  const levels = ["Beginner", "Intermediate", "Advanced"];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Step 3: Self Skill Assessment</h3>
        <p className="text-xs text-gray-500 mt-1">Rate your current proficiency across core technical domains.</p>
      </div>

      <div className="space-y-4">
        {skillCategories.map((cat) => {
          const currentVal = formData.skills?.[cat.id] || "Beginner";

          return (
            <div key={cat.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                {cat.label}
              </label>

              <div className="grid grid-cols-3 gap-2">
                {levels.map((lvl) => {
                  const isSelected = currentVal === lvl;
                  return (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => onChange("skills", { ...formData.skills, [cat.id]: lvl })}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillAssessmentStep;
