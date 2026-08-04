import React from "react";

function SyncHistoryCard({ history = [] }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          📜 Synchronization History Log
        </h3>
        <span className="text-[10px] text-gray-400 font-semibold">Audit Trail</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-400 font-bold uppercase text-[9px] tracking-wider">
              <th className="py-2 px-3">Timestamp</th>
              <th className="py-2 px-3">Platform</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Items Imported</th>
              <th className="py-2 px-3">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium text-[11px]">
            {history.map((log) => (
              <tr key={log._id}>
                <td className="py-2 px-3 text-gray-500">
                  {new Date(log.createdAt).toLocaleString([], {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="py-2 px-3 font-bold uppercase text-gray-800">{log.platform}</td>
                <td className="py-2 px-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                      log.status === "success"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}
                  >
                    {log.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-2 px-3 font-semibold text-gray-700">{log.itemsImported}</td>
                <td className="py-2 px-3 text-gray-500 truncate max-w-xs">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SyncHistoryCard;
