import CompanyAIAnalysis from "../models/CompanyAIAnalysis.js";
import Company from "../models/Company.js";
import { buildCompanyAIContext } from "../services/ai/companyContextBuilder.js";
import { buildCompanyReadinessPrompt } from "../prompts/companyReadinessPrompt.js";
import { buildCompanyComparisonPrompt } from "../prompts/companyComparisonPrompt.js";
import { AIProvider } from "../services/ai/aiProvider.js";

// POST /api/v1/company-ai/readiness
export const analyzeCompanyReadiness = async (req, res, next) => {
  try {
    const { companyId } = req.body;
    const userId = req.user._id;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "companyId is required.",
      });
    }

    // 1. Build aggregated context
    const context = await buildCompanyAIContext(userId, companyId);

    // 2. Build prompt
    const prompt = buildCompanyReadinessPrompt(context);

    // 3. Execute Gemini AI Call via Provider Abstraction
    const rawAnalysis = await AIProvider.generateJSON(prompt);

    if (!rawAnalysis || typeof rawAnalysis !== "object") {
      // Fallback: check for previous report
      const previousReport = await CompanyAIAnalysis.findOne({ user: userId, company: companyId });
      if (previousReport) {
        return res.status(200).json({
          success: true,
          message: "Gemini response format issue; serving previous cached report.",
          report: previousReport,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to generate AI Company Analysis. Please verify your Gemini API Key.",
      });
    }

    // 4. Save or update analysis record
    let report = await CompanyAIAnalysis.findOne({ user: userId, company: companyId });
    if (!report) {
      report = new CompanyAIAnalysis({
        user: userId,
        company: companyId,
        companyName: context.targetCompany.companyName,
        ...rawAnalysis,
      });
    } else {
      Object.assign(report, rawAnalysis);
      report.markModified("gapAnalysis");
      report.markModified("roadmap");
      report.markModified("interviewAnalysis");
      report.markModified("recommendations");
      report.updatedAt = new Date();
    }

    await report.save();

    res.status(200).json({
      success: true,
      message: `AI Readiness Analysis for ${context.targetCompany.companyName} generated successfully!`,
      report,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/company-ai/report/:companyId
export const getCompanyAIReportData = async (req, res, next) => {
  try {
    const { companyId } = req.params;
    const report = await CompanyAIAnalysis.findOne({ user: req.user._id, company: companyId });

    res.status(200).json({
      success: true,
      report: report || null,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/company-ai/compare
export const compareCompaniesWithAI = async (req, res, next) => {
  try {
    const { companyIds } = req.body;
    if (!companyIds || !Array.isArray(companyIds) || companyIds.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least 2 company IDs to compare.",
      });
    }

    const companies = await Company.find({ _id: { $in: companyIds } });
    const userContext = await buildCompanyAIContext(req.user._id, companyIds[0]);

    const prompt = buildCompanyComparisonPrompt(userContext.studentProfile, companies);
    const comparison = await AIProvider.generateJSON(prompt);

    res.status(200).json({
      success: true,
      comparison,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/company-ai/history
export const getCompanyAIHistoryData = async (req, res, next) => {
  try {
    const history = await CompanyAIAnalysis.find({ user: req.user._id })
      .populate("company")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    next(error);
  }
};
