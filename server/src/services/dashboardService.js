import Profile from "../models/Profile.js";
import User from "../models/User.js";

const MOTIVATION_QUOTES = [
  "Success is built on daily consistency, not periodic intensity.",
  "Small daily improvements over time lead to stunning career results.",
  "Don't limit your challenges. Challenge your limits.",
  "Opportunities don't happen. You create them through preparation.",
  "The secret of getting ahead is getting started.",
  "Your future is created by what you do today, not tomorrow.",
  "Consistency is what transforms average into excellence.",
];

/**
 * Calculates Career Readiness Score (0-100) and recommendation
 */
const calculateReadiness = (profile) => {
  if (!profile) {
    return {
      score: 20,
      recommendation: "Complete your student onboarding to unlock your readiness score.",
    };
  }

  let score = 20; // Base score for completing onboarding

  // 1. Skill Proficiency Points (Max 50 points)
  const skillWeights = { Beginner: 4, Intermediate: 7, Advanced: 10 };
  const skills = profile.skills || {};

  let skillPoints = 0;
  skillPoints += skillWeights[skills.dsa] || 4;
  skillPoints += skillWeights[skills.programming] || 4;
  skillPoints += skillWeights[skills.webDev] || 4;
  skillPoints += skillWeights[skills.coreCS] || 4;
  skillPoints += skillWeights[skills.aiMl] || 4;

  score += skillPoints; // Max +50

  // 2. Profile Links & Aspirations Points (Max 30 points)
  const links = profile.links || {};
  if (profile.dreamCompanies && profile.dreamCompanies.length > 0) score += 5;
  if (links.github && links.github.trim()) score += 7;
  if (links.linkedin && links.linkedin.trim()) score += 7;
  if (links.leetCode && links.leetCode.trim()) score += 6;
  if (links.codeforces || links.codeChef) score += 5;

  // Cap score at 100
  score = Math.min(100, Math.max(0, score));

  // 3. Dynamic Recommendation
  let recommendation = "";
  if (skills.dsa === "Beginner" || skills.programming === "Beginner") {
    recommendation = "Improve your DSA and Programming proficiency to boost your technical interview readiness.";
  } else if (!links.github || !links.linkedin) {
    recommendation = "Add your GitHub and LinkedIn profiles to showcase your work to recruiters.";
  } else if (score < 75) {
    recommendation = "Practice web development and core CS fundamentals to reach 80+ placement readiness.";
  } else {
    recommendation = "Outstanding readiness! You are well-positioned for top product company interviews.";
  }

  return { score, recommendation };
};

/**
 * Calculates Profile Completion Percentage & lists missing fields
 */
const calculateProfileCompletion = (profile) => {
  if (!profile) {
    return { percentage: 0, missingFields: ["Basic Info", "Career Goals", "Skills", "Links"] };
  }

  const fields = [
    { key: "college", label: "College Name", value: profile.college },
    { key: "degree", label: "Degree", value: profile.degree },
    { key: "branch", label: "Branch", value: profile.branch },
    { key: "currentYear", label: "Current Academic Year", value: profile.currentYear },
    { key: "graduationYear", label: "Graduation Year", value: profile.graduationYear },
    { key: "targetRole", label: "Target Role", value: profile.targetRole },
    { key: "placementGoal", label: "Placement Goal", value: profile.placementGoal },
    { key: "preferredDomain", label: "Preferred Domain", value: profile.preferredDomain },
    {
      key: "dreamCompanies",
      label: "Dream Companies",
      value: profile.dreamCompanies && profile.dreamCompanies.length > 0,
    },
    { key: "github", label: "GitHub Link", value: profile.links?.github },
    { key: "linkedin", label: "LinkedIn Link", value: profile.links?.linkedin },
    { key: "leetCode", label: "LeetCode Link", value: profile.links?.leetCode },
  ];

  let filledCount = 0;
  const missingFields = [];

  fields.forEach((field) => {
    if (field.value && String(field.value).trim() !== "" && field.value !== false) {
      filledCount++;
    } else {
      missingFields.push(field.label);
    }
  });

  const percentage = Math.round((filledCount / fields.length) * 100);

  return { percentage, missingFields };
};

/**
 * Maps raw skills to formatted skill objects with progress percentages
 */
const formatSkills = (rawSkills = {}) => {
  const percentageMap = {
    Beginner: 35,
    Intermediate: 70,
    Advanced: 95,
  };

  const skillDefinitions = [
    { key: "dsa", name: "Data Structures & Algorithms" },
    { key: "programming", name: "Programming Proficiency" },
    { key: "webDev", name: "Web Development" },
    { key: "coreCS", name: "Core CS Fundamentals" },
    { key: "aiMl", name: "AI / ML Fundamentals" },
  ];

  return skillDefinitions.map((def) => {
    const level = rawSkills[def.key] || "Beginner";
    return {
      key: def.key,
      name: def.name,
      level,
      percentage: percentageMap[level] || 35,
    };
  });
};

/**
 * Main service method to aggregate dashboard data
 */
export const getDashboardData = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }

  const profile = await Profile.findOne({ user: userId });

  const readiness = calculateReadiness(profile);
  const profileCompletion = calculateProfileCompletion(profile);
  const formattedSkills = formatSkills(profile?.skills);

  // Pick random daily motivation
  const randomMotivation =
    MOTIVATION_QUOTES[Math.floor(Math.random() * MOTIVATION_QUOTES.length)];

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      onboardingCompleted: user.onboardingCompleted,
      createdAt: user.createdAt,
    },
    profile: profile || null,
    skills: formattedSkills,
    readiness,
    profileCompletion,
    dailyMotivation: randomMotivation,
  };
};
