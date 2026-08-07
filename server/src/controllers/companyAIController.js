import CompanyAIAnalysis from "../models/CompanyAIAnalysis.js";
import Company from "../models/Company.js";
import { buildCompanyAIContext } from "../services/ai/companyContextBuilder.js";
import { buildCompanyReadinessPrompt } from "../prompts/companyReadinessPrompt.js";
import { buildCompanyComparisonPrompt } from "../prompts/companyComparisonPrompt.js";
import { AIProvider } from "../services/ai/aiProvider.js";

/**
 * Deterministic Rule-Based Readiness Calculator (CareerOS Estimated Match)
 */
const calculateCompanyRuleBasedReadiness = (context) => {
  const { studentProfile, resumeAnalysis, dsaMetrics, targetCompany } = context;

  // 1. Skill Match Calculation (0 - 100)
  const targetSkills = targetCompany.relevantSkills || targetCompany.resumeExpectations?.preferredSkills || [];
  const userSkills = new Set([
    ...(resumeAnalysis?.skills || []).map((s) => s.toLowerCase()),
    ...Object.keys(studentProfile?.skillLevels || {}).map((s) => s.toLowerCase()),
  ]);

  let matchedSkillsCount = 0;
  targetSkills.forEach((sk) => {
    if (userSkills.has(sk.toLowerCase())) matchedSkillsCount++;
  });

  const skillMatchScore = targetSkills.length > 0 ? Math.min(100, Math.round((matchedSkillsCount / targetSkills.length) * 100) + 30) : 75;

  // 2. DSA Readiness Calculation (0 - 100)
  const totalSolved = dsaMetrics?.combinedSolved || dsaMetrics?.manualSolved || 0;
  let dsaScore = 40;
  if (totalSolved >= 150) dsaScore = 90;
  else if (totalSolved >= 100) dsaScore = 80;
  else if (totalSolved >= 50) dsaScore = 65;
  else if (totalSolved >= 20) dsaScore = 50;

  // 3. CS Fundamentals Match (0 - 100)
  const csScore = studentProfile.branch?.includes("Computer") || studentProfile.branch?.includes("IT") ? 85 : 70;

  // 4. Technology & Project Match (0 - 100)
  const projScore = resumeAnalysis?.projects?.length >= 2 ? 85 : 60;
  const techScore = resumeAnalysis?.atsScore ? Math.min(100, resumeAnalysis.atsScore) : 70;

  // Weighted CareerOS Estimated Match Score
  const overallMatchScore = Math.min(
    100,
    Math.max(
      35,
      Math.round(
        skillMatchScore * 0.25 +
          dsaScore * 0.3 +
          csScore * 0.15 +
          projScore * 0.15 +
          techScore * 0.15
      )
    )
  );

  return {
    companyName: targetCompany.companyName,
    readinessScore: overallMatchScore,
    overallScore: overallMatchScore,
    scoreBreakdown: {
      skillMatch: skillMatchScore,
      dsaReadiness: dsaScore,
      csFundamentals: csScore,
      projectRelevance: projScore,
      technologyMatch: techScore,
    },
    executiveSummary: `Based on your profile metrics (${totalSolved} DSA problems solved, ${userSkills.size} technical skills verified), you have a ${overallMatchScore}% CareerOS Estimated Match for ${targetCompany.companyName}.`,
    gapAnalysis: {
      missingSkills: targetSkills.filter((sk) => !userSkills.has(sk.toLowerCase())).slice(0, 4),
      dsaGaps: totalSolved < 100 ? ["Increase problem solving speed on Graph & Dynamic Programming topics."] : [],
      projectGaps: projScore < 80 ? ["Add quantifiable metrics to your core project descriptions."] : [],
    },
    roadmap: [
      { step: 1, title: "Target Topic Mastery", focus: `Focus on ${targetCompany.preparation?.importantTopics?.slice(0, 3).join(", ") || "DSA"}` },
      { step: 2, title: "Company Specific Mock Tests", focus: `Practice 15+ ${targetCompany.companyName} tagged problems` },
      { step: 3, title: "Resume Optimization", focus: `Highlight ${targetCompany.resumeExpectations?.requiredTechnologies?.join(", ") || "core stack"}` },
    ],
    interviewAnalysis: {
      expectedRounds: targetCompany.interviewProcess?.technicalRounds || 3,
      keyFocusAreas: targetCompany.preparation?.importantTopics || ["DSA", "DBMS", "OOP"],
      predictedQuestions: [
        `Explain memory management & concurrency models used in ${targetCompany.companyName}'s domain.`,
        `How would you design a scalable microservice for ${targetCompany.companyName}?`,
      ],
    },
  };
};

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

    // 2. Compute deterministic rule-based analysis first
    const ruleBasedResult = calculateCompanyRuleBasedReadiness(context);

    // 3. Try Gemini AI enhancement
    let finalAnalysis = { ...ruleBasedResult };
    try {
      const prompt = buildCompanyReadinessPrompt(context);
      const rawAnalysis = await AIProvider.generateJSON(prompt);
      if (rawAnalysis && typeof rawAnalysis === "object" && rawAnalysis.overallScore !== undefined) {
        finalAnalysis = {
          ...ruleBasedResult,
          ...rawAnalysis,
          overallScore: rawAnalysis.overallScore || ruleBasedResult.overallScore,
          readinessScore: rawAnalysis.overallScore || ruleBasedResult.overallScore,
        };
      }
    } catch (aiErr) {
      console.warn("Gemini AI warning (serving rule-based evaluation):", aiErr.message);
    }

    // 4. Save or update analysis record in database
    let report = await CompanyAIAnalysis.findOne({ user: userId, company: companyId });
    if (!report) {
      report = new CompanyAIAnalysis({
        user: userId,
        company: companyId,
        companyName: context.targetCompany.companyName,
        ...finalAnalysis,
      });
    } else {
      Object.assign(report, finalAnalysis);
      report.markModified("gapAnalysis");
      report.markModified("roadmap");
      report.markModified("interviewAnalysis");
      report.markModified("scoreBreakdown");
      report.updatedAt = new Date();
    }

    await report.save();

    res.status(200).json({
      success: true,
      message: `AI Hiring Evaluation for ${context.targetCompany.companyName} completed!`,
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

    let comparison = null;
    try {
      const prompt = buildCompanyComparisonPrompt(userContext.studentProfile, companies);
      comparison = await AIProvider.generateJSON(prompt);
    } catch (aiErr) {
      console.warn("AI Comparison fallback notice:", aiErr.message);
    }

    // Rule-based comparison fallback
    if (!comparison) {
      comparison = {
        comparisonTitle: `${companies[0]?.companyName} vs ${companies[1]?.companyName}`,
        comparisonPoints: companies.map((c) => ({
          companyName: c.companyName,
          category: c.category,
          difficulty: c.difficultyLevel,
          hiringStatus: c.hiringStatus,
          dsaImportance: c.dsaImportance || "High",
          topTopics: c.preparation?.importantTopics || [],
          fresherCompensation: c.compensation?.fresherCTC || "Competitive",
        })),
        verdict: `Both ${companies[0]?.companyName} and ${companies[1]?.companyName} offer excellent engineering growth. Focus on core CS fundamentals & targeted DSA practice.`,
      };
    }

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
