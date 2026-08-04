import React from "react";

function ProblemTable({ problems = [], onEdit, onDelete, onRevise, isRevising }) {
  const getDiffBadge = (diff) => {
    switch (diff) {
      case "Easy":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Hard":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusBadge = (st) => {
    switch (st) {
      case "Solved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Revised":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Attempted":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  if (problems.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center space-y-2">
        <p className="text-xs font-bold text-gray-700">No matching DSA problems found.</p>
        <p className="text-[11px] text-gray-400">Try adjusting your filters or click "Log New Problem" above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4">Problem Name</th>
              <th className="py-3 px-4">Topic</th>
              <th className="py-3 px-4">Difficulty</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Platform</th>
              <th className="py-3 px-4">Revisions</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {problems.map((p) => (
              <tr key={p._id} className="hover:bg-indigo-50/30 transition">
                <td className="py-3 px-4 font-bold text-gray-900">
                  <div className="space-y-0.5">
                    {p.problemUrl ? (
                      <a
                        href={p.problemUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-indigo-600 hover:underline flex items-center space-x-1"
                      >
                        <span>{p.problemName}</span>
                        <span className="text-[10px] text-gray-400">↗</span>
                      </a>
                    ) : (
                      <span>{p.problemName}</span>
                    )}

                    {p.notes && (
                      <p className="text-[10px] text-gray-400 font-normal truncate max-w-xs">
                        📝 {p.notes}
                      </p>
                    )}
                  </div>
                </td>

                <td className="py-3 px-4 text-gray-700 font-medium">{p.topic}</td>

                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getDiffBadge(p.difficulty)}`}>
                    {p.difficulty}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusBadge(p.status)}`}>
                    {p.status}
                  </span>
                </td>

                <td className="py-3 px-4 text-gray-500 font-medium text-[11px]">
                  {p.platform || "Manual"}
                </td>

                <td className="py-3 px-4 font-semibold text-gray-700">
                  <div className="flex items-center space-x-1.5">
                    <span>🔄 {p.revisionCount || 0}</span>
                    {p.lastRevised && (
                      <span className="text-[9px] text-gray-400">
                        ({new Date(p.lastRevised).toLocaleDateString("en-US", { month: "short", day: "numeric" })})
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onRevise(p._id)}
                      disabled={isRevising === p._id}
                      className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] rounded transition border border-indigo-200"
                      title="Mark as revised today"
                    >
                      {isRevising === p._id ? "..." : "+ Revise"}
                    </button>

                    <button
                      onClick={() => onEdit(p)}
                      className="p-1 text-gray-400 hover:text-indigo-600 font-bold text-xs"
                      title="Edit Problem"
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => onDelete(p._id)}
                      className="p-1 text-gray-400 hover:text-red-600 font-bold text-xs"
                      title="Delete Problem"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProblemTable;
