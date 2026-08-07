import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getCompanies } from "../services/companyService";
import {
  generateCompanyAIAnalysis,
  getCompanyAIReport,
  getCompanyAIHistory,
} from "../services/companyAIService";

import CompanyReadinessGauges from "../components/companyAI/CompanyReadinessGauges";
import CompanyGapCard from "../components/companyAI/CompanyGapCard";
import CompanyRoadmapCard from "../components/companyAI/CompanyRoadmapCard";
import InterviewPrepCard from "../components/companyAI/InterviewPrepCard";

function CompanyAIMentor() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError("");

      const [compRes, histRes] = await Promise.all([
        getCompanies(),
        getCompanyAIHistory(),
      ]);

      if (compRes.success && compRes.companies?.length > 0) {
        setCompanies(compRes.companies);
        const defaultCompany = compRes.companies[0];
        setSelectedCompanyId(defaultCompany._id);

        // Fetch report for default company
        const repRes = await getCompanyAIReport(defaultCompany._id);
        if (repRes.success) setReport(repRes.report || null);
      }

      if (histRes.success) setHistory(histRes.history || []);
    } catch (err) {
      console.error("Fetch company AI data error:", err);
      setError("Failed to load target companies for AI evaluation.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleCompanyChange = async (e) => {
    const compId = e.target.value;
    setSelectedCompanyId(compId);
    setReport(null);

    try {
      setLoading(true);
      const repRes = await getCompanyAIReport(compId);
      if (repRes.success) setReport(repRes.report || null);
    } catch (err) {
      console.error("Fetch company report error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRunAnalysis = async () => {
    if (!selectedCompanyId) return;

    try {
      setIsAnalyzing(true);
      setError("");

      const res = await generateCompanyAIAnalysis(selectedCompanyId);
      if (res.success) {
        setReport(res.report);
        setSuccessMsg(res.message || "Company AI analysis generated!");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err) {
      console.error("AI Analysis error:", err);
      setError(err.response?.data?.message || err.message || "Failed to generate company AI evaluation.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const selectedCompany = companies.find((c) => c._id === selectedCompanyId);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-bold uppercase tracking-wider mb-2 shadow-sm">
              <span>✨ Phase 7B Active • Company AI Career Advisor</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Company AI Intelligence</h1>
            <p className="text-xs text-gray-500 mt-1">
              Select a target company to generate personalized AI hiring match %, gap analysis, preparation roadmaps, and interview questions.
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {companies.length > 0 ? (
              <select
                value={selectedCompanyId}
                onChange={handleCompanyChange}
                className="px-3 py-2.5 border border-gray-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none max-w-xs"
              >
                {companies.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.logo} {c.companyName} ({c.category || c.industry})
                  </option>
                ))}
              </select>
            ) : (
              <div className="px-3 py-2 border border-amber-200 bg-amber-50 rounded-xl text-xs font-semibold text-amber-800">
                Loading target companies...
              </div>
            )}

            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing || !selectedCompanyId}
              className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-xs rounded-xl shadow transition disabled:opacity-50 whitespace-nowrap"
            >
              {isAnalyzing ? "🧠 Evaluating..." : "✨ Evaluate Match"}
            </button>
          </div>
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

        {loading ? (
          <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-semibold text-gray-700">Analyzing target company profile and student context...</p>
          </div>
        ) : !report ? (
          <div className="bg-white rounded-2xl p-10 border border-gray-200 text-center space-y-4 shadow-sm max-w-lg mx-auto">
            <span className="text-4xl block">🏢</span>
            <h3 className="text-lg font-bold text-gray-900">
              Select a target company to begin your CareerOS hiring evaluation
            </h3>
            <p className="text-xs text-gray-500">
              Select **{selectedCompany?.companyName || "a company"}** from the dropdown above and click **"Evaluate Match"** to run career evaluation across your skills, resume metrics, DSA progress, and target hiring requirements.
            </p>
            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing || !selectedCompanyId}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition disabled:opacity-50"
            >
              Evaluate Match for {selectedCompany?.companyName || "Target Company"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Executive Summary */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center space-x-2">
                  <span>✨ Recruiter Assessment for {report.companyName}</span>
                </h3>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm">
                  CareerOS Estimated Match ({report.overallScore || report.readinessScore || 75}%)
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium leading-relaxed text-gray-700 bg-indigo-50/40 p-4 rounded-xl border border-indigo-100/80">
                "{report.executiveSummary}"
              </p>
            </div>

            {/* 7-Factor Readiness Gauges */}
            <CompanyReadinessGauges report={report} />

            {/* Gap Analysis */}
            <CompanyGapCard gapAnalysis={report.gapAnalysis} companyName={report.companyName} />

            {/* Execution Roadmap */}
            <CompanyRoadmapCard roadmap={report.roadmap} companyName={report.companyName} />

            {/* Predicted Interview Questions */}
            <InterviewPrepCard
              interviewAnalysis={report.interviewAnalysis}
              companyName={report.companyName}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default CompanyAIMentor;
