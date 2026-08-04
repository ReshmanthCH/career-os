import React from "react";

function SkillOverview({ skills = [] }) {
  const getBadgeColor = (level) => {
    switch (level) {
      case "Advanced":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Intermediate":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getBarColor = (level) => {
    switch (level) {
      case "Advanced":
        return "from-purple-500 to-indigo-600";
      case "Intermediate":
        return "from-blue-500 to-indigo-500";
      default:
        return "from-slate-400 to-slate-500";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Technical Skill Proficiency
        </h2>
        <span className="text-xs text-gray-400 font-medium">Self Assessed</span>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.key} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-800">{skill.name}</span>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getBadgeColor(
                    skill.level
                  )}`}
                >
                  {skill.level}
                </span>
                <span className="text-gray-400 text-[11px] font-medium w-8 text-right">
                  {skill.percentage}%
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getBarColor(
                  skill.level
                )} transition-all duration-500`}
                style={{ width: `${skill.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillOverview;
