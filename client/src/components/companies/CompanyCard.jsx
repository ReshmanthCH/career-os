import React from "react";
import { Link } from "react-router-dom";
import BookmarkButton from "./BookmarkButton";

function CompanyCard({ company, onToggleBookmark, isSelectedForCompare, onSelectCompare }) {
  const getHiringBadge = (status) => {
    switch (status) {
      case "Actively Hiring":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Hiring Soon":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

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
    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* Header Bar */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl p-2 bg-gray-50 rounded-xl border border-gray-100">{company.logo}</span>
            <div>
              <Link to={`/companies/${company._id}`} className="font-extrabold text-sm text-gray-900 hover:text-indigo-600 transition">
                {company.companyName}
              </Link>
              <p className="text-[11px] text-gray-500 font-medium line-clamp-1">{company.industry}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isSelectedForCompare}
              onChange={() => onSelectCompare(company._id)}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300 cursor-pointer"
              title="Select to Compare"
            />
            <BookmarkButton isBookmarked={company.isBookmarked} onToggle={() => onToggleBookmark(company._id, company.isBookmarked)} />
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 text-[10px]">
          <span className={`px-2 py-0.5 rounded font-bold border ${getHiringBadge(company.hiringStatus)}`}>
            ● {company.hiringStatus}
          </span>
          <span className={`px-2 py-0.5 rounded font-bold border ${getDiffBadge(company.difficultyLevel)}`}>
            {company.difficultyLevel} Tier
          </span>
          {company.internshipAvailable && (
            <span className="px-2 py-0.5 rounded font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Internship
            </span>
          )}
        </div>

        {/* Salary Overview */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1 text-xs">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-400 font-medium">Fresher CTC:</span>
            <span className="font-bold text-gray-900">{company.compensation?.fresherCTC || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-gray-400 font-medium">Stipend:</span>
            <span className="font-semibold text-emerald-700">{company.compensation?.internshipCTC || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
        <span className="text-[10px] text-gray-400 font-medium">{company.headquarters}</span>
        <Link
          to={`/companies/${company._id}`}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition flex items-center space-x-1"
        >
          <span>View Insights</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}

export default CompanyCard;
