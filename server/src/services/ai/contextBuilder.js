import User from "../../models/User.js";
import Profile from "../../models/Profile.js";
import Resume from "../../models/Resume.js";
import DSAProgress from "../../models/DSAProgress.js";
import PlatformProfile from "../../models/PlatformProfile.js";
import { calculateDSAAnalytics } from "../dsaAnalyticsService.js";

/**
 * Aggregates a comprehensive context object from the user's complete CareerOS data.
 */
export const buildUserDSAContext = async (userId) => {
  const [user, profile, resume, dsaProblems, platformProfiles, analytics] = await Promise.all([
    User.findById(userId).select("-password"),
    Profile.findOne({ user: userId }),
    Resume.findOne({ user: userId }),
    DSAProgress.find({ user: userId }).sort({ updatedAt: -1 }),
    PlatformProfile.find({ user: userId, isConnected: true }),
    calculateDSAAnalytics(userId),
  ]);

  // Extract Connected Platforms
  const platformStats = {};
  platformProfiles.forEach((p) => {
    platformStats[p.platform] = {
      username: p.username,
      stats: p.stats,
    };
  });

  return {
    studentInfo: {
      name: user?.name || "Student",
      email: user?.email || "",
      college: profile?.college || "Not specified",
      degree: profile?.degree || "Not specified",
      branch: profile?.branch || "Computer Science",
      currentYear: profile?.currentYear || "3rd Year",
      targetRole: profile?.targetRole || "Software Development Engineer (SDE)",
      placementGoal: profile?.placementGoal || "Product Based Company (FAANG / Unicorns)",
      preferredDomain: profile?.preferredDomain || "Full Stack Web Development",
      dreamCompanies: profile?.dreamCompanies || ["Google", "Amazon", "Microsoft"],
      skillLevels: profile?.skillLevels || {},
    },
    resumeMetrics: resume
      ? {
          overallScore: resume.overallScore || resume.score || 0,
          atsScore: resume.atsScore || resume.score || 0,
          strengths: resume.strengths || [],
          weaknesses: resume.weaknesses || [],
        }
      : null,
    dsaSummary: {
      totalLoggedProblems: dsaProblems.length,
      manualSolved: analytics.manualSolved || 0,
      combinedSolved: analytics.combinedSolved || 0,
      overallProgress: analytics.overallProgress || 0,
      studyStreakDays: analytics.studyStreak || 0,
      totalRevisions: analytics.totalRevisions || 0,
      difficultyDistribution: analytics.difficultyDistribution || {},
      topicWiseProgress: analytics.topicWiseProgress || [],
    },
    platformStats,
    recentProblems: dsaProblems.slice(0, 10).map((p) => ({
      name: p.problemName,
      topic: p.topic,
      difficulty: p.difficulty,
      status: p.status,
      confidence: p.confidenceLevel,
      revisionCount: p.revisionCount,
      notes: p.notes,
    })),
  };
};
