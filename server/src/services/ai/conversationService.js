import { AIProvider } from "./aiProvider.js";
import { buildUnifiedCopilotContext } from "./copilotContextBuilder.js";
import {
  buildCopilotChatPrompt,
  buildCareerAnalysisPrompt,
  buildPersonalizedRoadmapPrompt,
  buildRecommendationsPrompt,
} from "./copilotPromptManager.js";
import { getOrCreateConversation, appendMessageToConversation } from "./memoryService.js";

import CopilotCareerAnalysis from "../../models/CopilotCareerAnalysis.js";
import CopilotRoadmap from "../../models/CopilotRoadmap.js";
import CopilotRecommendation from "../../models/CopilotRecommendation.js";

/**
 * Handle interactive AI Copilot Chat
 */
export const processCopilotChat = async (userId, userMessage, conversationId = null) => {
  const conversation = await getOrCreateConversation(userId, conversationId);
  const context = await buildUnifiedCopilotContext(userId);

  const prompt = buildCopilotChatPrompt(context, conversation.messages, userMessage);
  const aiResponseText = await AIProvider.generateText(prompt);

  const updatedConversation = await appendMessageToConversation(
    conversation._id,
    userMessage,
    aiResponseText,
    { modelUsed: "gemini-2.5-flash", contextTimestamp: context.contextTimestamp }
  );

  return {
    conversationId: updatedConversation._id,
    message: aiResponseText,
    conversation: updatedConversation,
  };
};

/**
 * Generate 360° Career Readiness Analysis
 */
export const generateCareerAnalysisService = async (userId) => {
  const context = await buildUnifiedCopilotContext(userId);
  const prompt = buildCareerAnalysisPrompt(context);

  const analysisData = await AIProvider.generateJSON(prompt);

  if (!analysisData) {
    const cached = await CopilotCareerAnalysis.findOne({ user: userId });
    if (cached) return cached;
    throw new Error("Gemini AI is currently under high load. Please retry in a moment.");
  }

  // Save/Update in MongoDB
  const savedAnalysis = await CopilotCareerAnalysis.findOneAndUpdate(
    { user: userId },
    {
      user: userId,
      overallReadiness: analysisData.overallReadiness || 65,
      placementReadiness: analysisData.placementReadiness || 60,
      resumeReadiness: analysisData.resumeReadiness || 70,
      dsaReadiness: analysisData.dsaReadiness || 65,
      projectReadiness: analysisData.projectReadiness || 60,
      interviewReadiness: analysisData.interviewReadiness || 55,
      learningVelocity: analysisData.learningVelocity || "Moderate",
      consistencyScore: analysisData.consistencyScore || 75,
      executiveSummary: analysisData.executiveSummary || "",
      strengths: analysisData.strengths || [],
      weakAreas: analysisData.weakAreas || [],
      targetCompanyFit: analysisData.targetCompanyFit || [],
      actionPlan: analysisData.actionPlan || {},
      modelUsed: "gemini-2.5-flash",
    },
    { new: true, upsert: true }
  );

  savedAnalysis.markModified("targetCompanyFit");
  savedAnalysis.markModified("actionPlan");
  await savedAnalysis.save();

  return savedAnalysis;
};

/**
 * Generate Personalized Multi-Tier Execution Roadmap
 */
export const generateRoadmapService = async (userId) => {
  const context = await buildUnifiedCopilotContext(userId);
  const prompt = buildPersonalizedRoadmapPrompt(context);

  const roadmapData = await AIProvider.generateJSON(prompt);

  if (!roadmapData) {
    const cached = await CopilotRoadmap.findOne({ user: userId });
    if (cached) return cached;
    throw new Error("Gemini AI is currently under high load. Please retry in a moment.");
  }

  const savedRoadmap = await CopilotRoadmap.findOneAndUpdate(
    { user: userId },
    {
      user: userId,
      todayPlan: roadmapData.todayPlan || [],
      weeklyPlan: roadmapData.weeklyPlan || [],
      monthlyPlan: roadmapData.monthlyPlan || [],
      quarterlyPlan: roadmapData.quarterlyPlan || [],
      semesterPlan: roadmapData.semesterPlan || [],
      targetCompanies: roadmapData.targetCompanies || [],
      estimatedTimeline: roadmapData.estimatedTimeline || "12 Weeks",
      focusAreas: roadmapData.focusAreas || [],
      modelUsed: "gemini-2.5-flash",
    },
    { new: true, upsert: true }
  );

  savedRoadmap.markModified("todayPlan");
  savedRoadmap.markModified("weeklyPlan");
  savedRoadmap.markModified("monthlyPlan");
  savedRoadmap.markModified("quarterlyPlan");
  savedRoadmap.markModified("semesterPlan");
  await savedRoadmap.save();

  return savedRoadmap;
};

/**
 * Generate Personalized Recommendations
 */
export const generateRecommendationsService = async (userId) => {
  const context = await buildUnifiedCopilotContext(userId);
  const prompt = buildRecommendationsPrompt(context);

  const recData = await AIProvider.generateJSON(prompt);

  if (!recData) {
    const cached = await CopilotRecommendation.findOne({ user: userId });
    if (cached) return cached;
    throw new Error("Gemini AI is currently under high load. Please retry in a moment.");
  }

  const savedRecs = await CopilotRecommendation.findOneAndUpdate(
    { user: userId },
    {
      user: userId,
      items: recData.items || [],
      summaryNote: recData.summaryNote || "",
      modelUsed: "gemini-2.5-flash",
    },
    { new: true, upsert: true }
  );

  return savedRecs;
};
