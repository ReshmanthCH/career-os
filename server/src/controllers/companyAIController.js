import CompanyAIAnalysis from "../models/CompanyAIAnalysis.js";
import Company from "../models/Company.js";
import { buildCompanyAIContext } from "../services/ai/companyContextBuilder.js";
import { buildCompanyReadinessPrompt } from "../prompts/companyReadinessPrompt.js";
import { buildCompanyComparisonPrompt } from "../prompts/companyComparisonPrompt.js";
import { AIProvider } from "../services/ai/aiProvider.js";

/**
 * Deterministic Rule-Based Readiness Calculator (CareerOS Estimated Match)
 * Strictly conforms to frontend rendering schemas (CompanyReadinessGauges, CompanyGapCard, CompanyRoadmapCard, InterviewPrepCard).
 */
const calculateCompanyRuleBasedReadiness = (context) => {
  const { studentProfile, resumeAnalysis, dsaMetrics, targetCompany } = context;

  // 1. Target vs User Skills
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

  // 2. DSA Readiness
  const totalSolved = dsaMetrics?.combinedSolved || dsaMetrics?.manualSolved || 0;
  let dsaScore = 40;
  if (totalSolved >= 150) dsaScore = 90;
  else if (totalSolved >= 100) dsaScore = 80;
  else if (totalSolved >= 50) dsaScore = 65;
  else if (totalSolved >= 20) dsaScore = 50;

  // 3. Core CS Subjects
  const csScore = studentProfile.branch?.includes("Computer") || studentProfile.branch?.includes("IT") ? 85 : 70;

  // 4. Project & Resume Fit
  const projScore = resumeAnalysis?.projects?.length >= 2 ? 85 : 60;
  const techScore = resumeAnalysis?.atsScore ? Math.min(100, resumeAnalysis.atsScore) : 70;

  // 5. GitHub Activity
  const githubScore = context.connectedPlatforms?.github ? 80 : 35;

  // 6. Interview Readiness Average
  const overallReadiness = Math.min(
    100,
    Math.max(
      35,
      Math.round(
        skillMatchScore * 0.2 +
          dsaScore * 0.25 +
          csScore * 0.15 +
          projScore * 0.15 +
          techScore * 0.15 +
          githubScore * 0.1
      )
    )
  );

  const interviewReadiness = Math.round((overallReadiness + dsaScore + csScore) / 3);

  const missingSkills = targetSkills.filter((sk) => !userSkills.has(sk.toLowerCase()));

  return {
    companyName: targetCompany.companyName,
    overallReadiness,
    resumeReadiness: techScore,
    dsaReadiness: dsaScore,
    projectReadiness: projScore,
    githubReadiness: githubScore,
    coreCSReadiness: csScore,
    interviewReadiness,
    executiveSummary: `Based on your profile metrics (${totalSolved} DSA problems solved, ${userSkills.size} technical skills verified), you have a ${overallReadiness}% CareerOS Estimated Match for ${targetCompany.companyName}.`,
    gapAnalysis: {
      missingDSATopics: targetCompany.preparation?.importantTopics?.slice(0, 3) || ["Graph Algorithms", "Dynamic Programming"],
      missingProjects: targetCompany.resumeExpectations?.preferredProjects?.slice(0, 2) || [`Distributed Backend Project for ${targetCompany.companyName}`],
      missingTechnologies: missingSkills.length > 0 ? missingSkills.slice(0, 3) : (targetCompany.resumeExpectations?.requiredTechnologies || ["Core Technologies"]),
      weakAreas: totalSolved < 50 ? ["DSA Problem Solving Count (under 50 problems)", "System Design & Machine Coding Experience"] : ["Advanced Graph & DP Speed"],
      strongAreas: [
        "Computer Science & Engineering Core Fundamentals",
        userSkills.size > 0 ? `Verified Technical Skills (${Array.from(userSkills).slice(0, 3).join(", ")})` : "Technical Aptitude & Problem Solving",
      ],
    },
    roadmap: {
      dailyTasks: [
        {
          day: "Day 1 (Today)",
          tasks: [
            `Solve 2 Medium problems on ${targetCompany.preparation?.importantTopics?.[0] || "DSA Topics"}`,
            `Review ${targetCompany.companyName} online assessment patterns & interview rounds`,
          ],
        },
        {
          day: "Day 2 (Tomorrow)",
          tasks: [
            `Study ${targetCompany.preparation?.importantTopics?.[1] || "Trees & Graphs"} fundamentals`,
            `Optimize Resume bullet points for ${targetCompany.companyName}'s preferred technologies`,
          ],
        },
        {
          day: "Day 3",
          tasks: [
            `Attempt 1 Hard problem on ${targetCompany.preparation?.importantTopics?.[0] || "Target Topic"}`,
            `Practice 1 behavioral interview story using the STAR framework`,
          ],
        },
      ],
      weeklyPlan: [
        `Week 1: Master ${targetCompany.preparation?.importantTopics?.slice(0, 2).join(" & ") || "Core DSA"} for ${targetCompany.companyName} technical rounds`,
        `Week 2: Deep dive into System Design & ${targetCompany.companyName} tagged problems`,
        `Week 3: Conduct mock technical interviews & refine project architecture descriptions`,
      ],
      monthlyPlan: `Reach 80%+ benchmark readiness for ${targetCompany.companyName} by solving 25+ additional Medium/Hard problems and polishing technical projects.`,
      estimatedTimeline: "Ready in 3-4 weeks of focused preparation",
    },
    interviewAnalysis: {
      expectedDifficulty: `${targetCompany.difficultyLevel || "Hard"} Tier`,
      likelyDSATopics: targetCompany.preparation?.importantTopics || ["Arrays & Hashing", "Trees", "BFS/DFS Graphs", "Dynamic Programming"],
      likelyResumeQuestions: [
        `Walk me through the architecture and technical trade-offs of your primary project.`,
        `How did you optimize API latency, database queries, or state management in your application?`,
      ],
      likelyBehavioralQuestions: [
        `Tell me about a challenging technical bug you resolved under a tight deadline.`,
        `How do you handle technical disagreements or scope changes when working in a team?`,
      ],
    },
    recommendations: [
      {
        title: `Build ${targetCompany.companyName} Specific Project`,
        type: "priority",
        message: `Add a project utilizing ${targetCompany.resumeExpectations?.requiredTechnologies?.join(", ") || "target tech stack"} to align with ${targetCompany.companyName}'s recruiter expectations.`,
      },
    ],
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
      if (rawAnalysis && typeof rawAnalysis === "object") {
        finalAnalysis = {
          ...ruleBasedResult,
          ...rawAnalysis,
          overallReadiness: rawAnalysis.overallReadiness || rawAnalysis.overallScore || ruleBasedResult.overallReadiness,
          resumeReadiness: rawAnalysis.resumeReadiness || ruleBasedResult.resumeReadiness,
          dsaReadiness: rawAnalysis.dsaReadiness || ruleBasedResult.dsaReadiness,
          projectReadiness: rawAnalysis.projectReadiness || ruleBasedResult.projectReadiness,
          githubReadiness: rawAnalysis.githubReadiness || ruleBasedResult.githubReadiness,
          coreCSReadiness: rawAnalysis.coreCSReadiness || ruleBasedResult.coreCSReadiness,
          interviewReadiness: rawAnalysis.interviewReadiness || ruleBasedResult.interviewReadiness,
          gapAnalysis: rawAnalysis.gapAnalysis ? { ...ruleBasedResult.gapAnalysis, ...rawAnalysis.gapAnalysis } : ruleBasedResult.gapAnalysis,
          roadmap: rawAnalysis.roadmap ? { ...ruleBasedResult.roadmap, ...rawAnalysis.roadmap } : ruleBasedResult.roadmap,
          interviewAnalysis: rawAnalysis.interviewAnalysis ? { ...ruleBasedResult.interviewAnalysis, ...rawAnalysis.interviewAnalysis } : ruleBasedResult.interviewAnalysis,
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
      report.markModified("recommendations");
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
