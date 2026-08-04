import User from "../../models/User.js";
import Profile from "../../models/Profile.js";
import Resume from "../../models/Resume.js";
import DSAProgress from "../../models/DSAProgress.js";
import PlatformProfile from "../../models/PlatformProfile.js";
import Company from "../../models/Company.js";
import { calculateDSAAnalytics } from "../dsaAnalyticsService.js";

/**
 * Aggregates a complete student context combined with target company requirements for AI analysis.
 */
export const buildCompanyAIContext = async (userId, companyId) => {
  const [user, profile, resume, dsaProblems, platformProfiles, analytics, company] = await Promise.all([
    User.findById(userId).select("-password"),
    Profile.findOne({ user: userId }),
    Resume.findOne({ user: userId }),
    DSAProgress.find({ user: userId }).sort({ updatedAt: -1 }),
    PlatformProfile.find({ user: userId, isConnected: true }),
    calculateDSAAnalytics(userId),
    Company.findById(companyId),
  ]);

  if (!company) {
    throw new Error("Target company not found.");
  }

  // Extract Platform Profiles
  const platformStats = {};
  platformProfiles.forEach((p) => {
    platformStats[p.platform] = {
      username: p.username,
      stats: p.stats,
    };
  });

  return {
    studentProfile: {
      name: user?.name || "Student",
      email: user?.email || "",
      college: profile?.college || "Not specified",
      degree: profile?.degree || "Not specified",
      branch: profile?.branch || "Computer Science",
      currentYear: profile?.currentYear || "3rd Year",
      targetRole: profile?.targetRole || "Software Development Engineer (SDE)",
      preferredDomain: profile?.preferredDomain || "Full Stack Web Development",
      dreamCompanies: profile?.dreamCompanies || ["Google", "Amazon", "Microsoft"],
      skillLevels: profile?.skillLevels || {},
    },
    resumeAnalysis: resume
      ? {
          overallScore: resume.overallScore || resume.score || 0,
          atsScore: resume.atsScore || resume.score || 0,
          strengths: resume.strengths || [],
          weaknesses: resume.weaknesses || [],
          projects: resume.structuredContent?.projects || [],
          skills: resume.structuredContent?.skills || [],
        }
      : null,
    dsaMetrics: {
      totalLoggedProblems: dsaProblems.length,
      manualSolved: analytics.manualSolved || 0,
      combinedSolved: analytics.combinedSolved || 0,
      overallProgressPct: analytics.overallProgress || 0,
      studyStreakDays: analytics.studyStreak || 0,
      difficultyBreakdown: analytics.difficultyDistribution || {},
      topicWiseProgress: analytics.topicWiseProgress || [],
    },
    connectedPlatforms: platformStats,
    targetCompany: {
      companyName: company.companyName,
      industry: company.industry,
      hiringStatus: company.hiringStatus,
      difficultyLevel: company.difficultyLevel,
      interviewProcess: company.interviewProcess,
      preparation: company.preparation,
      resumeExpectations: company.resumeExpectations,
      compensation: company.compensation,
    },
  };
};
