import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  sendCopilotChatMessage,
  generateCopilotCareerAnalysis,
  getCopilotCareerAnalysis,
  generateCopilotRoadmap,
  getCopilotRoadmap,
  generateCopilotRecommendations,
  getCopilotRecommendations,
  getCopilotHistory,
  getCopilotHistoryById,
  deleteCopilotHistory,
  togglePinCopilotHistory,
} from "../services/copilotService";

import ChatWindow from "../components/copilot/ChatWindow";
import CareerAnalysisCard from "../components/copilot/CareerAnalysisCard";
import RoadmapCard from "../components/copilot/RoadmapCard";
import RecommendationCard from "../components/copilot/RecommendationCard";
import HistoryCard from "../components/copilot/HistoryCard";

function AICareerCopilot() {
  const [activeTab, setActiveTab] = useState("chat");

  // Chat State
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);

  // Feature Data States
  const [careerAnalysis, setCareerAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [roadmap, setRoadmap] = useState(null);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);

  const [recommendations, setRecommendations] = useState(null);
  const [isGeneratingRecs, setIsGeneratingRecs] = useState(false);

  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const loadInitialData = async () => {
    try {
      const [analysisRes, roadmapRes, recRes, historyRes] = await Promise.all([
        getCopilotCareerAnalysis(),
        getCopilotRoadmap(),
        getCopilotRecommendations(),
        getCopilotHistory(),
      ]);

      if (analysisRes.success) setCareerAnalysis(analysisRes.analysis);
      if (roadmapRes.success) setRoadmap(roadmapRes.roadmap);
      if (recRes.success) setRecommendations(recRes.recommendations);
      if (historyRes.success) {
        setHistory(historyRes.history || []);
        if (historyRes.history?.length > 0) {
          const latestId = historyRes.history[0]._id;
          setActiveConversationId(latestId);
          fetchConversationMessages(latestId);
        }
      }
    } catch (err) {
      console.error("Error loading Copilot data:", err);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const fetchConversationMessages = async (id) => {
    try {
      const res = await getCopilotHistoryById(id);
      if (res.success && res.conversation) {
        setMessages(res.conversation.messages || []);
      }
    } catch (err) {
      console.error("Fetch conversation error:", err);
    }
  };

  const handleSendMessage = async (text) => {
    try {
      setIsSending(true);
      setError("");

      const res = await sendCopilotChatMessage(text, activeConversationId);
      if (res.success) {
        setActiveConversationId(res.conversationId);
        setMessages(res.conversation.messages || []);
        
        const histRes = await getCopilotHistory();
        if (histRes.success) setHistory(histRes.history || []);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setError(err.response?.data?.message || "Gemini AI is experiencing high traffic. Please retry in a few seconds.");
    } finally {
      setIsSending(false);
    }
  };

  const handleSelectPrompt = (promptText) => {
    setActiveTab("chat");
    handleSendMessage(promptText);
  };

  const handleGenerateAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      setError("");
      const res = await generateCopilotCareerAnalysis();
      if (res.success) setCareerAnalysis(res.analysis);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err.response?.data?.message || "Gemini AI is experiencing high demand. Please wait 10 seconds and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateRoadmap = async () => {
    try {
      setIsGeneratingRoadmap(true);
      setError("");
      const res = await generateCopilotRoadmap();
      if (res.success) setRoadmap(res.roadmap);
    } catch (err) {
      console.error("Roadmap error:", err);
      setError(err.response?.data?.message || "Gemini AI is experiencing high demand. Please wait 10 seconds and try again.");
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  const handleGenerateRecommendations = async () => {
    try {
      setIsGeneratingRecs(true);
      setError("");
      const res = await generateCopilotRecommendations();
      if (res.success) setRecommendations(res.recommendations);
    } catch (err) {
      console.error("Recommendations error:", err);
      setError(err.response?.data?.message || "Gemini AI is experiencing high demand. Please wait 10 seconds and try again.");
    } finally {
      setIsGeneratingRecs(false);
    }
  };

  const handleTogglePin = async (id) => {
    try {
      await togglePinCopilotHistory(id);
      const histRes = await getCopilotHistory();
      if (histRes.success) setHistory(histRes.history || []);
    } catch (err) {
      console.error("Toggle pin error:", err);
    }
  };

  const handleDeleteConversation = async (id) => {
    try {
      await deleteCopilotHistory(id);
      if (activeConversationId === id) {
        setActiveConversationId(null);
        setMessages([]);
      }
      const histRes = await getCopilotHistory();
      if (histRes.success) setHistory(histRes.history || []);
    } catch (err) {
      console.error("Delete conversation error:", err);
    }
  };

  const handleSelectHistoryConversation = (id) => {
    setActiveConversationId(id);
    fetchConversationMessages(id);
    setActiveTab("chat");
  };

  const tabs = [
    { id: "chat", label: "💬 AI Copilot Chat" },
    { id: "analysis", label: "📊 360° Readiness" },
    { id: "roadmap", label: "📅 Roadmaps" },
    { id: "recommendations", label: "💡 Recommendations" },
    { id: "history", label: "📌 Saved Sessions" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-bold uppercase tracking-wider mb-2 shadow-sm">
              <span>✨ Central Intelligence Layer • CareerOS AI Copilot</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">AI Career Copilot</h1>
            <p className="text-xs text-gray-500 mt-1">
              Your 24/7 personalized career mentor. Analyzes your onboarding profile, resume metrics, DSA progress, GitHub repos, and company readiness.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveConversationId(null);
              setMessages([]);
              setActiveTab("chat");
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs rounded-xl shadow transition whitespace-nowrap"
          >
            + New Advisory Session
          </button>
        </div>

        {/* Error Notification Banner */}
        {error && (
          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-base">⏳</span>
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError("")}
              className="text-xs text-amber-700 hover:text-amber-950 font-bold ml-4"
            >
              Dismiss ✕
            </button>
          </div>
        )}

        {/* Sub-Navigation Tabs */}
        <div className="flex border-b border-gray-200 overflow-x-auto space-x-2 pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setError("");
                setActiveTab(t.id);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center space-x-2 ${
                activeTab === t.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Views */}
        {activeTab === "chat" && (
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isSending={isSending}
            onSelectPrompt={handleSelectPrompt}
          />
        )}

        {activeTab === "analysis" && (
          <CareerAnalysisCard
            analysis={careerAnalysis}
            onGenerate={handleGenerateAnalysis}
            isGenerating={isAnalyzing}
          />
        )}

        {activeTab === "roadmap" && (
          <RoadmapCard
            roadmap={roadmap}
            onGenerate={handleGenerateRoadmap}
            isGenerating={isGeneratingRoadmap}
          />
        )}

        {activeTab === "recommendations" && (
          <RecommendationCard
            recommendations={recommendations}
            onGenerate={handleGenerateRecommendations}
            isGenerating={isGeneratingRecs}
          />
        )}

        {activeTab === "history" && (
          <HistoryCard
            history={history}
            onSelectConversation={handleSelectHistoryConversation}
            onTogglePin={handleTogglePin}
            onDeleteConversation={handleDeleteConversation}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default AICareerCopilot;
