import React from "react";

function DSAStatCard({ analytics }) {
  const solvedCount = analytics?.solvedProblems || analytics?.combinedSolved || 0;
  const totalCount = analytics?.totalProblems || 150;
  const connectedProfiles = analytics?.platformProfiles?.filter((p) => p.isConnected) || [];

  const stats = [
    {
      title: "Overall Progress",
      value: `${analytics?.overallProgress || 0}%`,
      subtitle: `${solvedCount} of ${totalCount} target solved`,
      icon: "🎯",
      color: "from-indigo-50 to-violet-50 text-indigo-900 border-indigo-100",
    },
    {
      title: "Problems Solved",
      value: solvedCount,
      subtitle: connectedProfiles.length > 0
        ? `Synced from ${connectedProfiles.map((p) => p.platform).join(", ")}`
        : `${analytics?.attemptedProblems || 0} attempted`,
      icon: "✅",
      color: "from-emerald-50 to-teal-50 text-emerald-900 border-emerald-100",
    },
    {
      title: "Total Revisions",
      value: analytics?.totalRevisions || 0,
      subtitle: `${analytics?.revisedProblems || 0} problems revised`,
      icon: "🔄",
      color: "from-blue-50 to-cyan-50 text-blue-900 border-blue-100",
    },
    {
      title: "Study Streak",
      value: `${analytics?.studyStreak || 0} Days`,
      subtitle: "Active practice & platform activity",
      icon: "🔥",
      color: "from-amber-50 to-orange-50 text-amber-900 border-amber-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((st) => (
        <div
          key={st.title}
          className={`p-5 rounded-2xl border bg-gradient-to-br ${st.color} shadow-sm space-y-2 flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-70">
              {st.title}
            </span>
            <span className="text-xl">{st.icon}</span>
          </div>

          <div>
            <div className="text-3xl font-extrabold">{st.value}</div>
            <div className="text-[11px] font-medium opacity-80 mt-1 capitalize">{st.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DSAStatCard;
