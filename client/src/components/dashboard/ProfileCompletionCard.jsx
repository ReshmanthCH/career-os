import React from "react";
import { Link } from "react-router-dom";

function ProfileCompletionCard({ profileCompletion }) {
  const percentage = profileCompletion?.percentage || 0;
  const missingFields = profileCompletion?.missingFields || [];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Profile Completeness
        </h2>
        <span className="text-xs font-bold text-indigo-600">{percentage}% Completed</span>
      </div>

      <div className="space-y-3">
        {/* Progress bar */}
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-indigo-600 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        {missingFields.length > 0 ? (
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-gray-500 block">
              Missing details to reach 100%:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {missingFields.map((field) => (
                <span
                  key={field}
                  className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded text-[10px] font-medium"
                >
                  + {field}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xs text-emerald-700 font-semibold">
            🎉 Your student profile is 100% complete!
          </p>
        )}

        <div className="pt-2">
          <Link
            to="/profile"
            className="inline-block px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow transition"
          >
            Update Profile &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileCompletionCard;
