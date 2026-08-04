import Profile from "../../models/Profile.js";
import Resume from "../../models/Resume.js";
import DSAProgress from "../../models/DSAProgress.js";
import PlatformProfile from "../../models/PlatformProfile.js";
import CompanyAIAnalysis from "../../models/CompanyAIAnalysis.js";
import CompanyBookmark from "../../models/CompanyBookmark.js";
import SyncHistory from "../../models/SyncHistory.js";

/**
 * Builds one unified, structured context payload of the student's complete career data.
 */
export const buildUnifiedCopilotContext = async (userId) => {
  // Fetch all user modules concurrently
  const [
    profileDoc,
    resumeDoc,
    dsaProgressDoc,
    platformProfiles,
    companyAnalyses,
    bookmarks,
    syncHistory,
  ] = await Promise.all([
    Profile.findOne({ user: userId }),
    Resume.findOne({ user: userId }).sort({ createdAt: -1 }),
    DSAProgress.findOne({ user: userId }),
    PlatformProfile.find({ user: userId }),
    CompanyAIAnalysis.find({ user: userId }).sort({ updatedAt: -1 }).limit(5),
    CompanyBookmark.find({ user: userId }).populate("company"),
    SyncHistory.find({ user: userId }).sort({ createdAt: -1 }).limit(10),
  ]);

  // Extract platform profiles
  const platformMap = {};
  platformProfiles.forEach((p) => {
    platformMap[p.platform] = {
      username: p.username,
      isConnected: p.isConnected,
      stats: p.stats || {},
      lastSynced: p.lastSynced,
    };
  });

  // Extract resume AI score & insights
  const resumeContext = resumeDoc
    ? {
        overallScore: resumeDoc.overallScore,
        sectionScores: resumeDoc.sectionScores,
        atsMatchPercentage: resumeDoc.atsMatchPercentage,
        detectedSkills: resumeDoc.detectedSkills,
        improvements: resumeDoc.improvements,
        summary: resumeDoc.summary,
        lastEvaluated: resumeDoc.createdAt,
      }
    : null;

  // Extract DSA progress & platform stats
  const dsaContext = {
    progress: dsaProgressDoc
      ? {
          manualTotalSolved: dsaProgressDoc.totalSolved || 0,
          easySolved: dsaProgressDoc.easySolved || 0,
          mediumSolved: dsaProgressDoc.mediumSolved || 0,
          hardSolved: dsaProgressDoc.hardSolved || 0,
          targetGoal: dsaProgressDoc.targetGoal || 300,
          topicBreakdown: dsaProgressDoc.topicBreakdown || [],
          revisionQueue: dsaProgressDoc.revisionQueue || [],
        }
      : null,
    leetcode: platformMap.leetcode || null,
    codeforces: platformMap.codeforces || null,
    codechef: platformMap.codechef || null,
    github: platformMap.github || null,
  };

  // Extract company evaluation summaries
  const companyContext = {
    bookmarkedCompanies: bookmarks.map((b) => ({
      name: b.company?.companyName || "Company",
      industry: b.company?.industry,
      tier: b.company?.tier,
      techStack: b.company?.techStack,
    })),
    recentEvaluations: companyAnalyses.map((ca) => ({
      companyName: ca.companyName,
      overallReadiness: ca.overallReadiness,
      resumeReadiness: ca.resumeReadiness,
      dsaReadiness: ca.dsaReadiness,
      executiveSummary: ca.executiveSummary,
    })),
  };

  return {
    studentProfile: profileDoc
      ? {
          name: profileDoc.user?.name,
          college: profileDoc.college,
          degree: profileDoc.degree,
          branch: profileDoc.branch,
          currentYear: profileDoc.currentYear,
          graduationYear: profileDoc.graduationYear,
          targetRole: profileDoc.targetRole,
          dreamCompanies: profileDoc.dreamCompanies,
          placementGoal: profileDoc.placementGoal,
          preferredDomain: profileDoc.preferredDomain,
          skills: profileDoc.skills,
          links: profileDoc.links,
        }
      : null,

    resume: resumeContext,
    dsa: dsaContext,
    companyIntelligence: companyContext,
    recentActivity: syncHistory.map((s) => ({
      platform: s.platform,
      status: s.status,
      details: s.details,
      timestamp: s.createdAt,
    })),

    contextTimestamp: new Date().toISOString(),
  };
};
