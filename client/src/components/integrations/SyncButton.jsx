import React from "react";

function SyncButton({ onSync, isSyncing, text = "Sync Now", className = "" }) {
  return (
    <button
      onClick={onSync}
      disabled={isSyncing}
      className={`px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition flex items-center space-x-1.5 disabled:opacity-60 ${className}`}
    >
      <span className={isSyncing ? "animate-spin" : ""}>🔄</span>
      <span>{isSyncing ? "Syncing..." : text}</span>
    </button>
  );
}

export default SyncButton;
