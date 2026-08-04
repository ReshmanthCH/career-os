import mongoose from "mongoose";
import {
  processCopilotChat,
  generateCareerAnalysisService,
  generateRoadmapService,
  generateRecommendationsService,
} from "../services/ai/conversationService.js";
import {
  getUserConversations,
  togglePinConversation,
} from "../services/ai/memoryService.js";

import CopilotConversation from "../models/CopilotConversation.js";
import CopilotCareerAnalysis from "../models/CopilotCareerAnalysis.js";
import CopilotRoadmap from "../models/CopilotRoadmap.js";
import CopilotRecommendation from "../models/CopilotRecommendation.js";

/**
 * POST /api/v1/copilot/chat
 */
export const handleChat = async (req, res, next) => {
  try {
    const { message, conversationId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message parameter is required.",
      });
    }

    if (conversationId && !mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation ID format.",
      });
    }

    const result = await processCopilotChat(req.user._id, message.trim(), conversationId);

    res.status(200).json({
      success: true,
      conversationId: result.conversationId,
      message: result.message,
      conversation: result.conversation,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/v1/copilot/career-analysis
 */
export const handleGenerateCareerAnalysis = async (req, res, next) => {
  try {
    const analysis = await generateCareerAnalysisService(req.user._id);

    res.status(200).json({
      success: true,
      message: "360° Career Readiness Analysis generated successfully!",
      analysis,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/copilot/career-analysis
 */
export const getLatestCareerAnalysis = async (req, res, next) => {
  try {
    const analysis = await CopilotCareerAnalysis.findOne({ user: req.user._id });

    res.status(200).json({
      success: true,
      analysis: analysis || null,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/v1/copilot/roadmap
 */
export const handleGenerateRoadmap = async (req, res, next) => {
  try {
    const roadmap = await generateRoadmapService(req.user._id);

    res.status(200).json({
      success: true,
      message: "Personalized Execution Roadmap generated successfully!",
      roadmap,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/copilot/roadmap
 */
export const getLatestRoadmap = async (req, res, next) => {
  try {
    const roadmap = await CopilotRoadmap.findOne({ user: req.user._id });

    res.status(200).json({
      success: true,
      roadmap: roadmap || null,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/v1/copilot/recommendations
 */
export const handleGenerateRecommendations = async (req, res, next) => {
  try {
    const recommendations = await generateRecommendationsService(req.user._id);

    res.status(200).json({
      success: true,
      message: "Personalized Action Recommendations generated!",
      recommendations,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/copilot/recommendations
 */
export const getLatestRecommendations = async (req, res, next) => {
  try {
    const recommendations = await CopilotRecommendation.findOne({ user: req.user._id });

    res.status(200).json({
      success: true,
      recommendations: recommendations || null,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/copilot/history
 */
export const getHistory = async (req, res, next) => {
  try {
    const history = await getUserConversations(req.user._id);

    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/copilot/history/:id
 */
export const getHistoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid conversation ID format." });
    }

    const conversation = await CopilotConversation.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }

    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/v1/copilot/history/:id
 */
export const deleteHistory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid conversation ID format." });
    }

    const deleted = await CopilotConversation.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Conversation deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/v1/copilot/pin/:id
 */
export const togglePin = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid conversation ID format." });
    }

    const conversation = await togglePinConversation(req.user._id, id);

    res.status(200).json({
      success: true,
      message: conversation.isPinned ? "Conversation pinned!" : "Conversation unpinned.",
      conversation,
    });
  } catch (error) {
    next(error);
  }
};
