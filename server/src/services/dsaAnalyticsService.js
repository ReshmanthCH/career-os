import DSAProgress, { ALLOWED_TOPICS } from "../models/DSAProgress.js";
import PlatformProfile from "../models/PlatformProfile.js";

/**
 * Service to compute comprehensive DSA analytics for a user, combining manual & connected platform profiles.
 */
export const calculateDSAAnalytics = async (userId) => {
  const problems = await DSAProgress.find({ user: userId }).sort({ updatedAt: -1 });

  // Fetch Connected Platform Profiles (LeetCode, Codeforces, CodeChef, GitHub)
  const platformProfiles = await PlatformProfile.find({ user: userId, isConnected: true });

  const leetCodeProfile = platformProfiles.find((p) => p.platform === "leetcode");
  const codeforcesProfile = platformProfiles.find((p) => p.platform === "codeforces");
  const gitHubProfile = platformProfiles.find((p) => p.platform === "github");
  const codeChefProfile = platformProfiles.find((p) => p.platform === "codechef");

  const manualSolved = problems.filter((p) => p.status === "Solved" || p.status === "Revised").length;
  const leetCodeSolved = leetCodeProfile?.stats?.totalSolved || 0;
  const codeforcesSolved = codeforcesProfile?.stats?.totalSolved || 0;
  const codeChefSolved = codeChefProfile?.stats?.totalSolved || 0;

  // Total Solved across manual + connected platform profiles
  const combinedSolved = manualSolved + leetCodeSolved + codeforcesSolved + codeChefSolved;

  const totalProblemsCount = problems.length;
  const attemptedProblems = problems.filter((p) => p.status === "Attempted").length;
  const revisedProblems = problems.filter((p) => p.revisionCount > 0).length;
  const totalRevisions = problems.reduce((acc, p) => acc + (p.revisionCount || 0), 0);

  // Standard Target Benchmark for Placement Readiness (e.g. 150 problems)
  const targetGoal = Math.max(totalProblemsCount, 150);
  const overallProgress = Math.min(100, Math.round((combinedSolved / targetGoal) * 100));

  // Difficulty Distribution
  const easyManual = problems.filter((p) => p.difficulty === "Easy" && (p.status === "Solved" || p.status === "Revised")).length;
  const mediumManual = problems.filter((p) => p.difficulty === "Medium" && (p.status === "Solved" || p.status === "Revised")).length;
  const hardManual = problems.filter((p) => p.difficulty === "Hard" && (p.status === "Solved" || p.status === "Revised")).length;

  const easyImported = leetCodeProfile?.stats?.easySolved || 0;
  const mediumImported = leetCodeProfile?.stats?.mediumSolved || 0;
  const hardImported = leetCodeProfile?.stats?.hardSolved || 0;

  const easySolvedTotal = easyManual + easyImported;
  const mediumSolvedTotal = mediumManual + mediumImported;
  const hardSolvedTotal = hardManual + hardImported;

  const difficultyDistribution = {
    Easy: {
      manual: easyManual,
      imported: easyImported,
      solved: easySolvedTotal,
      total: Math.max(50, easySolvedTotal),
    },
    Medium: {
      manual: mediumManual,
      imported: mediumImported,
      solved: mediumSolvedTotal,
      total: Math.max(80, mediumSolvedTotal),
    },
    Hard: {
      manual: hardManual,
      imported: hardImported,
      solved: hardSolvedTotal,
      total: Math.max(20, hardSolvedTotal),
    },
  };

  // Core topic distribution mapping for connected platform profiles
  const coreTopicWeights = {
    Arrays: 0.18,
    Strings: 0.12,
    "Linked List": 0.08,
    Stack: 0.06,
    Queue: 0.04,
    Hashing: 0.10,
    "Binary Search": 0.08,
    Recursion: 0.05,
    Trees: 0.10,
    "Dynamic Programming": 0.12,
    Graph: 0.07,
  };

  // Topic-wise progress calculation
  const topicWiseProgress = ALLOWED_TOPICS.map((t) => {
    const topicProbs = problems.filter((p) => p.topic === t);
    const manualTopicSolved = topicProbs.filter((p) => p.status === "Solved" || p.status === "Revised").length;
    const manualTopicTotal = topicProbs.length;

    let solved = manualTopicSolved;
    let total = manualTopicTotal;

    // If connected platforms exist, derive topic mastery from imported profile stats
    if (combinedSolved > 0 && coreTopicWeights[t]) {
      const estimatedImportedSolved = Math.round(combinedSolved * coreTopicWeights[t]);
      solved = Math.max(manualTopicSolved, estimatedImportedSolved);
      total = Math.max(manualTopicTotal, Math.round(targetGoal * coreTopicWeights[t]));
    }

    const percentage = total > 0 ? Math.min(100, Math.round((solved / total) * 100)) : 0;
    return { topic: t, total, solved, percentage };
  });

  // Platform Distribution
  const platformDistribution = {
    Manual: manualSolved,
    LeetCode: leetCodeSolved,
    Codeforces: codeforcesSolved,
    CodeChef: codeChefSolved,
  };

  // Contest Ratings & Stats
  const contestStats = {
    leetcodeRating: leetCodeProfile?.stats?.contestRating || 0,
    leetcodeRanking: leetCodeProfile?.stats?.ranking || 0,
    codeforcesRating: codeforcesProfile?.stats?.rating || 0,
    codeforcesMaxRating: codeforcesProfile?.stats?.maxRating || 0,
    codeforcesRank: codeforcesProfile?.stats?.rank || "unranked",
    githubPublicRepos: gitHubProfile?.stats?.publicRepos || 0,
    githubTotalStars: gitHubProfile?.stats?.totalStars || 0,
  };

  // Activity Streak (uses connected platform last sync or problem update)
  const activityDates = [
    ...(leetCodeProfile?.lastSyncedAt ? [new Date(leetCodeProfile.lastSyncedAt)] : []),
    ...(codeforcesProfile?.lastSyncedAt ? [new Date(codeforcesProfile.lastSyncedAt)] : []),
    ...problems.map((p) => p.lastRevised || p.solvedDate || p.updatedAt),
  ]
    .filter(Boolean)
    .map((d) => new Date(d).toISOString().split("T")[0]);

  const uniqueDates = Array.from(new Set(activityDates)).sort().reverse();

  let streak = 0;
  if (uniqueDates.length > 0) {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    let checkDate = uniqueDates.includes(today) ? today : uniqueDates.includes(yesterday) ? yesterday : null;

    if (checkDate) {
      streak = 1;
      let curr = new Date(checkDate);
      while (true) {
        curr.setDate(curr.getDate() - 1);
        const prevStr = curr.toISOString().split("T")[0];
        if (uniqueDates.includes(prevStr)) {
          streak++;
        } else {
          break;
        }
      }
    }
  }

  // Recent Activity Feed
  const recentActivity = problems.slice(0, 5).map((p) => ({
    _id: p._id,
    problemName: p.problemName,
    topic: p.topic,
    difficulty: p.difficulty,
    status: p.status,
    updatedAt: p.updatedAt,
  }));

  return {
    totalProblems: Math.max(totalProblemsCount, combinedSolved),
    manualSolved,
    solvedProblems: combinedSolved,
    combinedSolved,
    attemptedProblems: Math.max(attemptedProblems, combinedSolved),
    revisedProblems,
    totalRevisions,
    overallProgress,
    topicWiseProgress,
    difficultyDistribution,
    platformDistribution,
    contestStats,
    platformProfiles,
    studyStreak: Math.max(streak, combinedSolved > 0 ? 1 : 0),
    recentActivity,
  };
};
