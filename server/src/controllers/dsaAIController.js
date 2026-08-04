import DSAAIAnalysis from "../models/DSAAIAnalysis.js";
import DSAChatHistory from "../models/DSAChatHistory.js";
import { buildUserDSAContext } from "../services/ai/contextBuilder.js";
import { buildDSAAnalysisPrompt } from "../prompts/dsaAnalysisPrompt.js";
import { buildDSAMentorChatPrompt } from "../prompts/dsaMentorChatPrompt.js";
import { AIProvider } from "../services/ai/aiProvider.js";
import { validateDSAAIResponse } from "../services/ai/responseValidator.js";

// POST /api/v1/ai/dsa/analyze
export const analyzeDSAWithAI = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // 1. Build aggregated context
    const context = await buildUserDSAContext(userId);

    // 2. Build prompt
    const prompt = buildDSAAnalysisPrompt(context);

    // 3. Execute Gemini AI Call via Provider Abstraction
    let rawAnalysis = await AIProvider.generateJSON(prompt);

    if (!rawAnalysis || !validateDSAAIResponse(rawAnalysis)) {
      // If AI fails or returns invalid schema, attempt fetching previous report or fallback
      const previousReport = await DSAAIAnalysis.findOne({ user: userId }).sort({ createdAt: -1 });
      if (previousReport) {
        return res.status(200).json({
          success: true,
          message: "Gemini API response format issue; serving previous cached report.",
          report: previousReport,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to generate valid AI DSA Analysis. Please try again.",
      });
    }

    // Sanitize recommendations if Gemini returns stringified or nested array
    if (typeof rawAnalysis.recommendations === "string") {
      try {
        rawAnalysis.recommendations = JSON.parse(rawAnalysis.recommendations);
      } catch (e) {
        rawAnalysis.recommendations = [{ title: "AI Recommendation", message: rawAnalysis.recommendations }];
      }
    }

    // 4. Save or update analysis record
    let report = await DSAAIAnalysis.findOne({ user: userId });
    if (!report) {
      report = new DSAAIAnalysis({ user: userId, ...rawAnalysis });
    } else {
      Object.assign(report, rawAnalysis);
      report.markModified("recommendations");
      report.markModified("studyPlan");
      report.markModified("companyReadiness");
      report.markModified("strongestTopics");
      report.markModified("weakestTopics");
      report.updatedAt = new Date();
    }

    await report.save();

    res.status(200).json({
      success: true,
      message: "AI DSA Analysis generated successfully!",
      report,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/ai/dsa/report
export const getDSAAIReport = async (req, res, next) => {
  try {
    const report = await DSAAIAnalysis.findOne({ user: req.user._id });

    res.status(200).json({
      success: true,
      report: report || null,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/ai/dsa/chat
export const chatWithDSAMentor = async (req, res, next) => {
  try {
    const { message } = req.body;
    const userId = req.user._id;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message content is required.",
      });
    }

    // 1. Fetch user context
    const context = await buildUserDSAContext(userId);

    // 2. Fetch or create Chat History
    let chatRecord = await DSAChatHistory.findOne({ user: userId });
    if (!chatRecord) {
      chatRecord = new DSAChatHistory({ user: userId, messages: [] });
    }

    // Append user message
    chatRecord.messages.push({ role: "user", content: message.trim() });

    // 3. Build Prompt with context
    const prompt = buildDSAMentorChatPrompt(context, message.trim());

    // 4. Execute AI Call
    const aiResponseText = await AIProvider.generateChat(prompt);

    // Append AI response
    chatRecord.messages.push({ role: "model", content: aiResponseText });
    await chatRecord.save();

    res.status(200).json({
      success: true,
      reply: aiResponseText,
      chatHistory: chatRecord.messages,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/ai/dsa/chat
export const getDSAChatHistoryData = async (req, res, next) => {
  try {
    const chatRecord = await DSAChatHistory.findOne({ user: req.user._id });

    res.status(200).json({
      success: true,
      chatHistory: chatRecord?.messages || [],
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/ai/dsa/chat
export const clearDSAChatHistoryData = async (req, res, next) => {
  try {
    await DSAChatHistory.findOneAndDelete({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: "Chat history cleared successfully.",
    });
  } catch (error) {
    next(error);
  }
};
