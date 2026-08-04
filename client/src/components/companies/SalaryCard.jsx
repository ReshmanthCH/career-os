import React from "react";

function SalaryCard({ compensation }) {
  if (!compensation) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          💰 Compensation & Pay Packages
        </h3>
        <span className="text-[10px] text-gray-400 font-semibold">Industry Benchmarks</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Full-Time Fresher CTC</span>
          <div className="text-xl font-extrabold text-indigo-900">{compensation.fresherCTC || "N/A"}</div>
          <span className="text-[10px] text-indigo-500 font-medium">Base + Stocks + Joining Bonus</span>
        </div>

        <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Internship Stipend</span>
          <div className="text-xl font-extrabold text-emerald-900">{compensation.internshipCTC || "N/A"}</div>
          <span className="text-[10px] text-emerald-500 font-medium">Monthly Compensation</span>
        </div>
      </div>
    </div>
  );
}

export default SalaryCard;
