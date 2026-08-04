import React from "react";
import { Link } from "react-router-dom";

function ComparisonTable({ companies = [] }) {
  if (companies.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center space-y-2">
        <p className="text-xs font-bold text-gray-700">No companies selected for comparison.</p>
        <p className="text-[11px] text-gray-400">Select checkboxes on company cards in the list view to compare them side-by-side.</p>
      </div>
    );
  }

  const getDiffBadge = (diff) => {
    switch (diff) {
      case "Hard":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-900 text-white font-bold text-xs">
              <th className="py-4 px-4 min-w-[160px]">Metric</th>
              {companies.map((c) => (
                <th key={c._id} className="py-4 px-4 min-w-[220px]">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{c.logo}</span>
                    <Link to={`/companies/${c._id}`} className="hover:underline text-indigo-200">
                      {c.companyName}
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 font-medium">
            {/* Industry */}
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/50">Industry</td>
              {companies.map((c) => (
                <td key={c._id} className="py-3 px-4 text-gray-700">{c.industry}</td>
              ))}
            </tr>

            {/* Difficulty Tier */}
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/50">Difficulty Tier</td>
              {companies.map((c) => (
                <td key={c._id} className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getDiffBadge(c.difficultyLevel)}`}>
                    {c.difficultyLevel}
                  </span>
                </td>
              ))}
            </tr>

            {/* Hiring Status */}
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/50">Hiring Status</td>
              {companies.map((c) => (
                <td key={c._id} className="py-3 px-4 text-gray-700 font-semibold">{c.hiringStatus}</td>
              ))}
            </tr>

            {/* Fresher CTC */}
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/50">Fresher CTC</td>
              {companies.map((c) => (
                <td key={c._id} className="py-3 px-4 font-extrabold text-indigo-900">{c.compensation?.fresherCTC || "N/A"}</td>
              ))}
            </tr>

            {/* Internship Stipend */}
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/50">Internship Stipend</td>
              {companies.map((c) => (
                <td key={c._id} className="py-3 px-4 font-bold text-emerald-700">{c.compensation?.internshipCTC || "N/A"}</td>
              ))}
            </tr>

            {/* DSA Weightage */}
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/50">DSA Weightage</td>
              {companies.map((c) => (
                <td key={c._id} className="py-3 px-4 font-semibold text-gray-800">{c.preparation?.dsaWeightage || 50}%</td>
              ))}
            </tr>

            {/* Online Assessment */}
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/50">Online Assessment</td>
              {companies.map((c) => (
                <td key={c._id} className="py-3 px-4 text-gray-600 text-[11px] leading-relaxed">{c.interviewProcess?.onlineAssessment}</td>
              ))}
            </tr>

            {/* System Design */}
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/50">System Design</td>
              {companies.map((c) => (
                <td key={c._id} className="py-3 px-4 text-gray-700">
                  {c.interviewProcess?.systemDesignRequired ? "✅ Required" : "❌ Not Required for Freshers"}
                </td>
              ))}
            </tr>

            {/* Important Topics */}
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/50">Core DSA Topics</td>
              {companies.map((c) => (
                <td key={c._id} className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {c.preparation?.importantTopics?.map((t, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-800 text-[9px] rounded font-semibold border border-indigo-100">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComparisonTable;
