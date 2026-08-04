import React from "react";

function RepositoryCard({ repos = [] }) {
  if (!repos || repos.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center space-x-2">
          <span>📦 Top Synced GitHub Repositories</span>
        </h3>
        <span className="text-[10px] text-gray-400 font-semibold">{repos.length} Repos</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {repos.map((r) => (
          <div key={r.id || r.name} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <a
                href={r.htmlUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-xs text-indigo-700 hover:underline flex items-center space-x-1"
              >
                <span>{r.name}</span>
                <span className="text-[10px] text-gray-400">↗</span>
              </a>
              <p className="text-[11px] text-gray-500 line-clamp-2 font-medium">
                {r.description || "No description provided."}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[10px] font-semibold text-gray-600">
              <span className="px-2 py-0.5 bg-indigo-100/70 text-indigo-800 rounded">
                {r.language || "Plain"}
              </span>
              <div className="flex items-center space-x-3 text-gray-500">
                <span>★ {r.stars || 0}</span>
                <span>🍴 {r.forks || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RepositoryCard;
