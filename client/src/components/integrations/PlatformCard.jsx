import { useState } from "react";
import SyncButton from "./SyncButton";

function PlatformCard({ platformKey, platformName, logo, color, connectedProfile, onConnect, onDisconnect, onSync, isActionLoading }) {
  const [username, setUsername] = useState("");
  const isConnected = connectedProfile?.isConnected;
  const stats = connectedProfile?.stats || {};
  const lastSynced = connectedProfile?.lastSynced;

  const handleConnectSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    onConnect(platformKey, username.trim());
    setUsername("");
  };

  return (
    <div className={`bg-white rounded-2xl p-6 border shadow-sm space-y-4 transition ${isConnected ? "border-gray-200" : "border-gray-200"}`}>
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center space-x-2.5">
          <span className="text-2xl">{logo}</span>
          <div>
            <h3 className="text-sm font-bold text-gray-900">{platformName}</h3>
            {isConnected ? (
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center space-x-1">
                <span>● Connected as @{connectedProfile.username}</span>
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-gray-400">Not Connected</span>
            )}
          </div>
        </div>

        {isConnected && (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active Sync
          </span>
        )}
      </div>

      {isConnected ? (
        <div className="space-y-4">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {platformKey === "github" && (
              <>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <div className="font-extrabold text-slate-900 text-base">{stats.publicRepos || 0}</div>
                  <div className="text-[10px] text-slate-500 font-semibold">Public Repos</div>
                </div>
                <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-100 text-center">
                  <div className="font-extrabold text-amber-900 text-base">★ {stats.totalStars || 0}</div>
                  <div className="text-[10px] text-amber-700 font-semibold">Total Stars</div>
                </div>
              </>
            )}

            {platformKey === "leetcode" && (
              <>
                <div className="p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100 text-center">
                  <div className="font-extrabold text-emerald-900 text-base">{stats.totalSolved || 0}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">Problems Solved</div>
                </div>
                <div className="p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-100 text-center">
                  <div className="font-extrabold text-indigo-900 text-base">{stats.contestRating || "Unrated"}</div>
                  <div className="text-[10px] text-indigo-700 font-semibold">Contest Rating</div>
                </div>
              </>
            )}

            {platformKey === "codeforces" && (
              <>
                <div className="p-2.5 bg-blue-50/50 rounded-xl border border-blue-100 text-center">
                  <div className="font-extrabold text-blue-900 text-base">{stats.rating || 0}</div>
                  <div className="text-[10px] text-blue-700 font-semibold">Current Rating</div>
                </div>
                <div className="p-2.5 bg-purple-50/50 rounded-xl border border-purple-100 text-center">
                  <div className="font-extrabold text-purple-900 text-base">{stats.maxRating || 0}</div>
                  <div className="text-[10px] text-purple-700 font-semibold">Max Rating</div>
                </div>
              </>
            )}

            {platformKey === "codechef" && (
              <>
                <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-100 text-center">
                  <div className="font-extrabold text-amber-900 text-base">{stats.stars || "1★"}</div>
                  <div className="text-[10px] text-amber-700 font-semibold">CodeChef Stars</div>
                </div>
                <div className="p-2.5 bg-orange-50/50 rounded-xl border border-orange-100 text-center">
                  <div className="font-extrabold text-orange-900 text-base">{stats.currentRating || 0}</div>
                  <div className="text-[10px] text-orange-700 font-semibold">Current Rating</div>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
            <span className="text-[10px] text-gray-400 font-medium">
              Last synced: {lastSynced ? new Date(lastSynced).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Never"}
            </span>

            <div className="flex items-center space-x-2">
              <SyncButton onSync={() => onSync(platformKey)} isSyncing={isActionLoading === `${platformKey}-sync`} />
              <button
                onClick={() => onDisconnect(platformKey)}
                disabled={isActionLoading === `${platformKey}-disconnect`}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleConnectSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-600 uppercase">
              Enter {platformName} Handle / Username
            </label>
            <input
              type="text"
              placeholder={`e.g. ${platformKey === "github" ? "octocat" : platformKey === "leetcode" ? "tourist" : "feferraj"}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isActionLoading === `${platformKey}-connect`}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition disabled:opacity-50"
          >
            {isActionLoading === `${platformKey}-connect` ? "Connecting & Syncing..." : `Connect ${platformName}`}
          </button>
        </form>
      )}
    </div>
  );
}

export default PlatformCard;
