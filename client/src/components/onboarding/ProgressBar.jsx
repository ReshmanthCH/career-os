import React from "react";

function ProgressBar({ currentStep, totalSteps = 5 }) {
  const steps = [
    "Basic Details",
    "Career Goals",
    "Skill Assessment",
    "Profile Links",
    "Review & Submit",
  ];

  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full mb-8">
      {/* Step Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          Step {currentStep} of {totalSteps}: {steps[currentStep - 1]}
        </span>
        <span className="text-xs font-medium text-gray-500">
          {progressPercentage}% Completed
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step Dots indicator for desktop */}
      <div className="hidden sm:flex justify-between mt-4">
        {steps.map((label, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={label} className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isCompleted
                    ? "bg-indigo-600 text-white"
                    : isCurrent
                    ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? "✓" : stepNum}
              </div>
              <span
                className={`text-[11px] mt-1 font-medium ${
                  isCurrent ? "text-indigo-600 font-semibold" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;
