import { useState } from "react";

function CompanyRecommendationCard({ companyRecommendations = {} }) {
  const companies = [
    { key: "Google", name: "Google", logo: "🔍", color: "border-blue-200 bg-blue-50/50 text-blue-900" },
    { key: "Amazon", name: "Amazon", logo: "📦", color: "border-amber-200 bg-amber-50/50 text-amber-900" },
    { key: "Microsoft", name: "Microsoft", logo: "💻", color: "border-indigo-200 bg-indigo-50/50 text-indigo-900" },
    { key: "ProductStartups", name: "Product Startups", logo: "🚀", color: "border-purple-200 bg-purple-50/50 text-purple-900" },
  ];

  const [activeTab, setActiveTab] = useState("Google");

  const currentAdvice =
    companyRecommendations[activeTab] ||
    "Tailor your technical stack and project metrics specifically for this target company tier.";

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          🏢 Company-Specific ATS & Recruiter Tailoring
        </h3>
        <span className="text-[10px] text-gray-400 font-semibold">Tier 1 Target Insights</span>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {companies.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveTab(c.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border flex items-center space-x-1.5 ${
              activeTab === c.key
                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
            }`}
          >
            <span>{c.logo}</span>
            <span>{c.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
          Recommendation for {activeTab}:
        </span>
        <p className="text-xs text-slate-800 font-medium leading-relaxed">
          {currentAdvice}
        </p>
      </div>
    </div>
  );
}

export default CompanyRecommendationCard;
