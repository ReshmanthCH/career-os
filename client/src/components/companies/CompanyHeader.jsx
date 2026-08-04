import React from "react";
import BookmarkButton from "./BookmarkButton";

function CompanyHeader({ company, onToggleBookmark }) {
  if (!company) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="flex items-center space-x-4">
          <span className="text-4xl p-3 bg-slate-50 rounded-2xl border border-slate-200">{company.logo}</span>
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-gray-900">{company.companyName}</h1>
            <p className="text-xs font-semibold text-indigo-600">{company.industry}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium">
              <span>📍 {company.headquarters}</span>
              <span>•</span>
              <span>👥 {company.companySize}</span>
              <span>•</span>
              <span>📅 Founded {company.foundedYear}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          {company.careersPage && (
            <a
              href={company.careersPage}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition"
            >
              Careers Portal ↗
            </a>
          )}
          <BookmarkButton
            isBookmarked={company.isBookmarked}
            onToggle={() => onToggleBookmark(company._id, company.isBookmarked)}
            className="py-2 px-3"
          />
        </div>
      </div>
    </div>
  );
}

export default CompanyHeader;
