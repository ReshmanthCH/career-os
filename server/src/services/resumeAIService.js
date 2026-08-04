import Profile from "../models/Profile.js";
import { extractTextFromFile } from "../utils/textExtractor.js";
import { buildResumeAnalysisPrompt } from "../prompts/resumePrompt.js";
import { callGeminiAPI } from "./geminiService.js";
import { analyzeResumeContent } from "./resumeAnalysisService.js";

/**
 * Executes AI resume analysis with Gemini and fallback to rule-based analysis if AI is unavailable.
 */
export const runResumeAIAnalysis = async (userId, resumeDoc) => {
  const profile = (await Profile.findOne({ user: userId })) || {};

  let extractedText = "";
  try {
    extractedText = await extractTextFromFile(resumeDoc.filePath, resumeDoc.fileType);
  } catch (extractErr) {
    console.error("Text extraction warning:", extractErr.message);
  }

  // Attempt Gemini AI Analysis
  if (extractedText && extractedText.length > 20) {
    const prompt = buildResumeAnalysisPrompt(extractedText, profile);
    const aiResult = await callGeminiAPI(prompt);

    if (aiResult && typeof aiResult === "object" && aiResult.overallScore !== undefined) {
      // AI Success Payload
      return {
        score: aiResult.atsScore || aiResult.overallScore || 80,
        overallScore: aiResult.overallScore || 80,
        atsScore: aiResult.atsScore || 85,
        strengths: Array.isArray(aiResult.strengths) ? aiResult.strengths : [],
        weaknesses: Array.isArray(aiResult.weaknesses) ? aiResult.weaknesses : [],
        improvements: Array.isArray(aiResult.projectSuggestions) ? aiResult.projectSuggestions : [],
        missingSections: Array.isArray(aiResult.missingSections) ? aiResult.missingSections : [],
        projectSuggestions: Array.isArray(aiResult.projectSuggestions) ? aiResult.projectSuggestions : [],
        skillSuggestions: Array.isArray(aiResult.skillSuggestions) ? aiResult.skillSuggestions : [],
        grammarSuggestions: Array.isArray(aiResult.grammarSuggestions) ? aiResult.grammarSuggestions : [],
        companyRecommendations: {
          Google: aiResult.companyRecommendations?.Google || "Optimize for strong algorithmic complexity metrics & CS core.",
          Amazon: aiResult.companyRecommendations?.Amazon || "Highlight ownership and customer obsession in project achievements.",
          Microsoft: aiResult.companyRecommendations?.Microsoft || "Focus on robust software engineering principles & cloud/C# work.",
          ProductStartups: aiResult.companyRecommendations?.ProductStartups || "Emphasize full-stack speed, independence, and shipping code.",
        },
        improvedSummary: aiResult.improvedSummary || "",
        improvedProjects: Array.isArray(aiResult.improvedProjectDescriptions) ? aiResult.improvedProjectDescriptions : [],
        recruiterImpression: aiResult.recruiterImpression || "Strong technical foundation with high potential for product-based roles.",
        nextSteps: Array.isArray(aiResult.nextSteps) ? aiResult.nextSteps : [],
        analysisVersion: "ai-v1",
        lastAnalyzed: new Date(),
      };
    }
  }

  // Fallback to Rule-Based Analysis if Gemini fails or API key is missing
  console.log("Using Rule-Based Analysis fallback.");
  const ruleBased = await analyzeResumeContent(userId, {
    originalname: resumeDoc.originalName,
    mimetype: resumeDoc.fileType === "docx" ? "application/docx" : "application/pdf",
    size: resumeDoc.fileSize,
  });

  return {
    score: ruleBased.score,
    overallScore: ruleBased.score,
    atsScore: ruleBased.score,
    strengths: ruleBased.strengths,
    weaknesses: [
      "Missing quantifiable metrics in project bullet points.",
      "LinkedIn or GitHub links could be enhanced.",
    ],
    improvements: ruleBased.improvements,
    missingSections: ruleBased.formattingChecks?.emptySections || [],
    projectSuggestions: [
      "Use Action-Verb + Task + Result structure for project descriptions.",
    ],
    skillSuggestions: [
      "Add cloud tools (Docker, AWS) or advanced framework experience.",
    ],
    grammarSuggestions: [
      "Ensure all bullet points start with strong past-tense action verbs.",
    ],
    companyRecommendations: {
      Google: "Focus on Data Structures, Algorithms complexity, and scalable architecture.",
      Amazon: "Demonstrate Customer Obsession and Bias for Action in your project metrics.",
      Microsoft: "Highlight Object-Oriented design patterns and collaborative engineering projects.",
      ProductStartups: "Emphasize full-stack agility, fast execution, and modern web frameworks.",
    },
    improvedSummary: `Target-driven ${profile.targetRole || "Software Engineering"} candidate specializing in ${profile.preferredDomain || "Full-Stack Development"} with strong Computer Science fundamentals.`,
    improvedProjects: [
      {
        title: "Full-Stack Application",
        original: "Built a web app using React and Node.",
        improved: "Architected a scalable full-stack web application using React and Node.js, improving page render speeds by 35% across 500+ active users.",
      },
    ],
    recruiterImpression: "Well-structured candidate profile ready for technical interview preparation.",
    nextSteps: [
      "Add GitHub & LinkedIn links to header.",
      "Incorporate metric-driven bullet points for top projects.",
    ],
    sectionAnalysis: ruleBased.sectionAnalysis,
    skillAnalysis: ruleBased.skillAnalysis,
    projectAnalysis: ruleBased.projectAnalysis,
    formattingChecks: ruleBased.formattingChecks,
    analysisVersion: "rule-based",
    lastAnalyzed: new Date(),
  };
};
