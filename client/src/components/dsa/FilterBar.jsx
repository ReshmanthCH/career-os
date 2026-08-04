import React from "react";

const ALLOWED_TOPICS = [
  "All",
  "Arrays",
  "Strings",
  "Linked List",
  "Stack",
  "Queue",
  "Hashing",
  "Binary Search",
  "Recursion",
  "Backtracking",
  "Trees",
  "BST",
  "Heap",
  "Graph",
  "Greedy",
  "Dynamic Programming",
  "Trie",
  "Bit Manipulation",
  "Segment Tree",
];

const ALLOWED_DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];
const ALLOWED_STATUSES = ["All", "Not Started", "Attempted", "Solved", "Revised"];
const ALLOWED_PLATFORMS = ["All", "Manual", "LeetCode", "Codeforces", "CodeChef", "GeeksforGeeks", "Other"];

function FilterBar({ filters, onFilterChange }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
      {/* Search Input */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="🔍 Search problems by name..."
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <select
          value={filters.topic}
          onChange={(e) => onFilterChange("topic", e.target.value)}
          className="px-2.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-gray-700"
        >
          {ALLOWED_TOPICS.map((t) => (
            <option key={t} value={t}>
              Topic: {t}
            </option>
          ))}
        </select>

        <select
          value={filters.difficulty}
          onChange={(e) => onFilterChange("difficulty", e.target.value)}
          className="px-2.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-gray-700"
        >
          {ALLOWED_DIFFICULTIES.map((d) => (
            <option key={d} value={d}>
              Diff: {d}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="px-2.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-gray-700"
        >
          {ALLOWED_STATUSES.map((s) => (
            <option key={s} value={s}>
              Status: {s}
            </option>
          ))}
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange("sortBy", e.target.value)}
          className="px-2.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-gray-700"
        >
          <option value="newest">Sort: Newest</option>
          <option value="oldest">Sort: Oldest</option>
          <option value="recentlySolved">Sort: Recently Solved</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
