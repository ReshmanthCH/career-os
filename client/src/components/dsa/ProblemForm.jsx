import { useState, useEffect } from "react";

const ALLOWED_TOPICS = [
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

const ALLOWED_DIFFICULTIES = ["Easy", "Medium", "Hard"];
const ALLOWED_STATUSES = ["Not Started", "Attempted", "Solved", "Revised"];
const ALLOWED_PLATFORMS = [
  "Manual",
  "LeetCode",
  "Codeforces",
  "CodeChef",
  "GeeksforGeeks",
  "Other",
];

function ProblemForm({ initialData = null, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState({
    problemName: "",
    problemUrl: "",
    platform: "LeetCode",
    topic: "Arrays",
    difficulty: "Easy",
    status: "Solved",
    attempts: 1,
    timeTaken: 25,
    confidenceLevel: "Medium",
    notes: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        problemName: initialData.problemName || "",
        problemUrl: initialData.problemUrl || "",
        platform: initialData.platform || "Manual",
        topic: initialData.topic || "Arrays",
        difficulty: initialData.difficulty || "Easy",
        status: initialData.status || "Solved",
        attempts: initialData.attempts || 1,
        timeTaken: initialData.timeTaken || 0,
        confidenceLevel: initialData.confidenceLevel || "Medium",
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.problemName.trim()) {
      setError("Problem name is required.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-lg font-bold text-gray-900">
          {initialData ? "Edit DSA Problem Record" : "Log New DSA Problem"}
        </h3>
        <button onClick={onCancel} className="text-xs text-gray-400 hover:text-gray-700 font-bold">
          ✕ Cancel
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1">
            <label className="font-bold text-gray-700">Problem Name *</label>
            <input
              type="text"
              name="problemName"
              value={formData.problemName}
              onChange={handleChange}
              placeholder="e.g. Two Sum, Reverse Linked List"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-medium"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Topic *</label>
            <select
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-medium"
            >
              {ALLOWED_TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Difficulty *</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-medium"
            >
              {ALLOWED_DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-medium"
            >
              {ALLOWED_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Platform</label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-medium"
            >
              {ALLOWED_PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Problem URL (Optional)</label>
            <input
              type="url"
              name="problemUrl"
              value={formData.problemUrl}
              onChange={handleChange}
              placeholder="https://leetcode.com/problems/..."
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Confidence Level</label>
            <select
              name="confidenceLevel"
              value={formData.confidenceLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-medium"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Time Taken (Minutes)</label>
            <input
              type="number"
              name="timeTaken"
              value={formData.timeTaken}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Attempts Count</label>
            <input
              type="number"
              name="attempts"
              value={formData.attempts}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-medium"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-gray-700">Solution Approach & Key Takeaway Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Write key pattern takeaways, edge cases, time/space complexity notes..."
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-medium"
          ></textarea>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : initialData ? "Update Problem" : "Log Problem"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProblemForm;
