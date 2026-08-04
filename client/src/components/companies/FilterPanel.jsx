import React from "react";

function FilterPanel({ filters, onFilterChange, totalCount, selectedCountForCompare, onCompareClick }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col space-y-3 text-xs">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="🔍 Search target companies (e.g. Google, Amazon, Oracle)..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <select
            value={filters.hiringStatus}
            onChange={(e) => onFilterChange("hiringStatus", e.target.value)}
            className="px-2.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-gray-700"
          >
            <option value="All">Status: All</option>
            <option value="Actively Hiring">Actively Hiring</option>
            <option value="Hiring Soon">Hiring Soon</option>
            <option value="Selective">Selective</option>
          </select>

          <select
            value={filters.difficultyLevel}
            onChange={(e) => onFilterChange("difficultyLevel", e.target.value)}
            className="px-2.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-gray-700"
          >
            <option value="All">Tier: All</option>
            <option value="Easy">Easy Tier</option>
            <option value="Medium">Medium Tier</option>
            <option value="Hard">Hard Tier</option>
          </select>

          <select
            value={filters.internshipAvailable}
            onChange={(e) => onFilterChange("internshipAvailable", e.target.value)}
            className="px-2.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-gray-700"
          >
            <option value="All">Internship: All</option>
            <option value="true">Internships Available</option>
          </select>

          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange("sortBy", e.target.value)}
            className="px-2.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-gray-700"
          >
            <option value="name">Sort: Name (A-Z)</option>
            <option value="difficulty">Sort: Difficulty Tier</option>
          </select>
        </div>
      </div>

      {/* Compare Floating Bar */}
      {selectedCountForCompare > 0 && (
        <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 flex items-center justify-between">
          <span className="font-bold text-indigo-900 text-xs">
            {selectedCountForCompare} company selected for side-by-side comparison
          </span>
          <button
            onClick={onCompareClick}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow transition"
          >
            Compare Selected ({selectedCountForCompare}) &rarr;
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterPanel;
