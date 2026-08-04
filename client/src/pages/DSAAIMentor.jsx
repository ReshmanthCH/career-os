import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  analyzeDSAWithAI,
  getDSAAIReport,
  sendDSAChatMessage,
  getDSAChatHistory,
  clearDSAChatHistory,
} from "../services/dsaAIService";

import AISummaryCard from "../components/dsaAI/AISummaryCard";
import InterviewScoreCard from "../components/dsaAI/InterviewScoreCard";
import WeakTopicCard from "../components/dsaAI/WeakTopicCard";
import StudyPlanCard from "../components/dsaAI/StudyPlanCard";
import CompanyReadinessCard from "../components/dsaAI/CompanyReadinessCard";
import AIChat from "../components/dsaAI/AIChat";

function DSAAIMentor() {
  const [report, setReport] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSendingChat, setIsSendingChat] = useState(false);
  const [activeTab, setActiveTab] = useState("report"); // 'report' | 'chat'

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [repRes, chatRes] = await Promise.all([
        getDSAAIReport(),
        getDSAChatHistory(),
      ]);

      if (repRes.success) setReport(repRes.report || null);
      if (chatRes.success) setChatHistory(chatRes.chatHistory || []);
    } catch (err) {
      console.error("Fetch DSA AI data error:", err);
      setError("Failed to load DSA AI Mentor report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRunAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      setError("");

      const res = await analyzeDSAWithAI();
      if (res.success) {
        setReport(res.report);
        setSuccessMsg("AI DSA Intelligence analysis generated successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err) {
      console.error("AI Analysis error:", err);
      setError(err.response?.data?.message || err.message || "Failed to generate AI evaluation.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async (msg) => {
    try {
      setIsSendingChat(true);
      setError("");

      const res = await sendDSAChatMessage(msg);
      if (res.success) {
        setChatHistory(res.chatHistory || []);
      }
    } catch (err) {
      console.error("Send chat message error:", err);
      setError("Failed to process message with AI Mentor.");
    } finally {
      setIsSendingChat(false);
    }
  };

  const handleClearHistory = async () => {
    if (!window.confirm("Are you sure you want to clear your conversation history?")) return;

    try {
      const res = await clearDSAChatHistory();
      if (res.success) {
        setChatHistory([]);
        setSuccessMsg("Chat history cleared.");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err) {
      console.error("Clear chat error:", err);
      setError("Failed to clear chat history.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider mb-2 shadow-sm">
              <span>✨ Phase 6C Active • Gemini AI DSA Mentor</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">AI DSA Mentor & Intelligence</h1>
            <p className="text-xs text-gray-500 mt-1">
              Personalized AI interview readiness, dynamic study roadmaps, target company matching, and interactive coaching.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition disabled:opacity-50 flex items-center space-x-1.5"
            >
              <span>{isAnalyzing ? "🧠 AI Reasoning..." : "✨ Generate AI Report"}</span>
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

        {/* Tab Navigation */}
        <div className="flex space-x-2 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab("report")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === "report"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            📊 Full AI Intelligence Report
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === "chat"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            💬 Interactive AI Mentor Chat
          </button>
        </div>

        {/* Tab 1: AI Report */}
        {activeTab === "report" && (
          <div className="space-y-6">
            {!report && !loading && (
              <div className="bg-white rounded-2xl p-10 border border-gray-200 text-center space-y-4 shadow-sm max-w-lg mx-auto">
                <span className="text-4xl block">✨</span>
                <h3 className="text-lg font-bold text-gray-900">No AI DSA Evaluation Report Yet</h3>
                <p className="text-xs text-gray-500">
                  Click **"Generate AI Report"** above to run Gemini AI reasoning across your profile, resume metrics, connected platforms, and problem solving history.
                </p>
                <button
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition"
                >
                  Generate Initial AI Report
                </button>
              </div>
            )}

            {report && (
              <>
                <AISummaryCard
                  overallAssessment={report.overallAssessment}
                  version={report.analysisVersion}
                />

                <InterviewScoreCard report={report} />

                <StudyPlanCard studyPlan={report.studyPlan} />

                <WeakTopicCard
                  strongestTopics={report.strongestTopics}
                  weakestTopics={report.weakestTopics}
                  missingConcepts={report.missingConcepts}
                />

                <CompanyReadinessCard companyReadiness={report.companyReadiness} />
              </>
            )}
          </div>
        )}

        {/* Tab 2: AI Mentor Chat */}
        {activeTab === "chat" && (
          <AIChat
            chatHistory={chatHistory}
            onSendMessage={handleSendMessage}
            onClearHistory={handleClearHistory}
            isSending={isSendingChat}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default DSAAIMentor;
