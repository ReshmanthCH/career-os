import React from "react";

function ReviewSubmitStep({ formData, onEditStep, onSubmit, isSubmitting, error }) {
  const dreamCompaniesList = formData.dreamCompaniesInput
    ? formData.dreamCompaniesInput.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Step 5: Review & Submit</h3>
        <p className="text-xs text-gray-500 mt-1">Please review your information before completing onboarding.</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="space-y-4 text-xs">
        {/* Academic Details */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <h4 className="font-bold text-gray-900 uppercase tracking-wider">Academic Details</h4>
            <button
              onClick={() => onEditStep(1)}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-gray-700">
            <div><span className="font-medium text-gray-500">College:</span> {formData.college || "N/A"}</div>
            <div><span className="font-medium text-gray-500">Degree:</span> {formData.degree || "N/A"}</div>
            <div><span className="font-medium text-gray-500">Branch:</span> {formData.branch || "N/A"}</div>
            <div><span className="font-medium text-gray-500">Current Year:</span> {formData.currentYear || "N/A"}</div>
            <div><span className="font-medium text-gray-500">Graduation Year:</span> {formData.graduationYear || "N/A"}</div>
          </div>
        </div>

        {/* Career Goals */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <h4 className="font-bold text-gray-900 uppercase tracking-wider">Career Goals</h4>
            <button
              onClick={() => onEditStep(2)}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="space-y-1 text-gray-700">
            <div><span className="font-medium text-gray-500">Target Role:</span> {formData.targetRole || "N/A"}</div>
            <div><span className="font-medium text-gray-500">Placement Goal:</span> {formData.placementGoal || "N/A"}</div>
            <div><span className="font-medium text-gray-500">Preferred Domain:</span> {formData.preferredDomain || "N/A"}</div>
            <div>
              <span className="font-medium text-gray-500">Dream Companies:</span>{" "}
              {dreamCompaniesList.length > 0 ? dreamCompaniesList.join(", ") : "None specified"}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <h4 className="font-bold text-gray-900 uppercase tracking-wider">Skill Levels</h4>
            <button
              onClick={() => onEditStep(3)}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-gray-700">
            <div><span className="font-medium text-gray-500">DSA:</span> {formData.skills?.dsa}</div>
            <div><span className="font-medium text-gray-500">Programming:</span> {formData.skills?.programming}</div>
            <div><span className="font-medium text-gray-500">Web Dev:</span> {formData.skills?.webDev}</div>
            <div><span className="font-medium text-gray-500">Core CS:</span> {formData.skills?.coreCS}</div>
            <div><span className="font-medium text-gray-500">AI / ML:</span> {formData.skills?.aiMl}</div>
          </div>
        </div>

        {/* Links */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <h4 className="font-bold text-gray-900 uppercase tracking-wider">Profile Links</h4>
            <button
              onClick={() => onEditStep(4)}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="space-y-1 text-gray-700">
            {Object.entries(formData.links || {}).map(([key, val]) => (
              <div key={key}>
                <span className="font-medium text-gray-500 capitalize">{key}:</span>{" "}
                {val ? <a href={val} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">{val}</a> : "Not provided"}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center space-x-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Submitting Onboarding Profile...</span>
            </span>
          ) : (
            "Complete Onboarding & Go to Dashboard"
          )}
        </button>
      </div>
    </div>
  );
}

export default ReviewSubmitStep;
