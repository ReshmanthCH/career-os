import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  getConnectedPlatforms,
  connectPlatform,
  disconnectPlatform,
  syncPlatform,
  syncAllPlatforms,
  getSyncHistory,
} from "../services/integrationService";

import PlatformCard from "../components/integrations/PlatformCard";
import RepositoryCard from "../components/integrations/RepositoryCard";
import SyncHistoryCard from "../components/integrations/SyncHistoryCard";
import SyncButton from "../components/integrations/SyncButton";

function ConnectedPlatforms() {
  const [platforms, setPlatforms] = useState({});
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const platformDefinitions = [
    { key: "github", name: "GitHub", logo: "🐙", color: "slate" },
    { key: "leetcode", name: "LeetCode", logo: "🧩", color: "amber" },
    { key: "codeforces", name: "Codeforces", logo: "📊", color: "blue" },
    { key: "codechef", name: "CodeChef", logo: "👨‍🍳", color: "orange" },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [platRes, histRes] = await Promise.all([
        getConnectedPlatforms(),
        getSyncHistory(),
      ]);

      if (platRes.success) setPlatforms(platRes.platforms || {});
      if (histRes.success) setHistory(histRes.history || []);
    } catch (err) {
      console.error("Fetch platforms error:", err);
      setError("Failed to load platform connections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConnect = async (platformKey, username) => {
    try {
      setIsActionLoading(`${platformKey}-connect`);
      setError("");

      const res = await connectPlatform(platformKey, username);
      if (res.success) {
        setSuccessMsg(`Successfully connected & synced ${platformKey.toUpperCase()} profile!`);
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchData();
      }
    } catch (err) {
      console.error("Connect error:", err);
      setError(err.response?.data?.message || err.message || `Failed to connect ${platformKey}.`);
    } finally {
      setIsActionLoading("");
    }
  };

  const handleDisconnect = async (platformKey) => {
    if (!window.confirm(`Are you sure you want to disconnect ${platformKey.toUpperCase()}?`)) return;

    try {
      setIsActionLoading(`${platformKey}-disconnect`);
      setError("");

      const res = await disconnectPlatform(platformKey);
      if (res.success) {
        setSuccessMsg(`Disconnected ${platformKey.toUpperCase()}.`);
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchData();
      }
    } catch (err) {
      console.error("Disconnect error:", err);
      setError(err.response?.data?.message || `Failed to disconnect ${platformKey}.`);
    } finally {
      setIsActionLoading("");
    }
  };

  const handleSync = async (platformKey) => {
    try {
      setIsActionLoading(`${platformKey}-sync`);
      setError("");

      const res = await syncPlatform(platformKey);
      if (res.success) {
        setSuccessMsg(`Successfully synchronized ${platformKey.toUpperCase()}!`);
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchData();
      }
    } catch (err) {
      console.error("Sync error:", err);
      setError(err.response?.data?.message || `Failed to sync ${platformKey}.`);
    } finally {
      setIsActionLoading("");
    }
  };

  const handleSyncAll = async () => {
    try {
      setIsActionLoading("sync-all");
      setError("");

      const res = await syncAllPlatforms();
      if (res.success) {
        setSuccessMsg("Multi-platform synchronization completed!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchData();
      }
    } catch (err) {
      console.error("Sync all error:", err);
      setError("Failed to complete multi-platform sync.");
    } finally {
      setIsActionLoading("");
    }
  };

  const githubRepos = platforms.github?.stats?.topRepositories || [];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl">
        {/* Page Header */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider mb-2">
              <span>⚡ Phase 6B Active • Multi-Platform Sync Engine</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Connected Platforms</h1>
            <p className="text-xs text-gray-500 mt-1">
              Connect your GitHub, LeetCode, Codeforces, and CodeChef accounts to automatically sync problem stats and repositories.
            </p>
          </div>

          <SyncButton
            onSync={handleSyncAll}
            isSyncing={isActionLoading === "sync-all"}
            text="Sync All Connected Accounts"
            className="px-5 py-2.5"
          />
        </div>

        {/* Notifications */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-semibold rounded-xl">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl">
            {successMsg}
          </div>
        )}

        {/* Platform Connection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platformDefinitions.map((p) => (
            <PlatformCard
              key={p.key}
              platformKey={p.key}
              platformName={p.name}
              logo={p.logo}
              color={p.color}
              connectedProfile={platforms[p.key]}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              onSync={handleSync}
              isActionLoading={isActionLoading}
            />
          ))}
        </div>

        {/* Synced GitHub Repositories */}
        {githubRepos.length > 0 && <RepositoryCard repos={githubRepos} />}

        {/* Sync Audit Trail */}
        {history.length > 0 && <SyncHistoryCard history={history} />}
      </div>
    </DashboardLayout>
  );
}

export default ConnectedPlatforms;
