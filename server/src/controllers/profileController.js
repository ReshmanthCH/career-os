import Profile from "../models/Profile.js";
import User from "../models/User.js";
import { connectPlatformService } from "../services/integrations/syncService.js";

/**
 * Extracts platform username from full URL or handle
 */
export const extractPlatformUsername = (platform, input) => {
  if (!input || typeof input !== "string") return "";
  let trimmed = input.trim();

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const url = new URL(trimmed);
      const pathnameParts = url.pathname.split("/").filter(Boolean);

      if (platform === "github") {
        return pathnameParts[0] || "";
      } else if (platform === "leetcode") {
        if (pathnameParts[0] === "u" && pathnameParts[1]) return pathnameParts[1];
        return pathnameParts[0] || "";
      } else if (platform === "codeforces") {
        if (pathnameParts[0] === "profile" && pathnameParts[1]) return pathnameParts[1];
        return pathnameParts[0] || "";
      } else if (platform === "codechef") {
        if (pathnameParts[0] === "users" && pathnameParts[1]) return pathnameParts[1];
        return pathnameParts[0] || "";
      }
    } catch {
      // Fall through to trimmed string
    }
  }

  return trimmed.replace(/^@/, "").replace(/\/$/, "");
};

/**
 * Helper to auto-connect platform profiles if links are provided during onboarding or profile update
 */
const autoConnectProvidedPlatforms = async (userId, links) => {
  if (!links || typeof links !== "object") return;

  const platformMapping = [
    { key: "github", platform: "github" },
    { key: "leetCode", platform: "leetcode" },
    { key: "leetcode", platform: "leetcode" },
    { key: "codeforces", platform: "codeforces" },
    { key: "codeChef", platform: "codechef" },
    { key: "codechef", platform: "codechef" },
  ];

  for (const item of platformMapping) {
    const rawInput = links[item.key];
    if (rawInput) {
      const username = extractPlatformUsername(item.platform, rawInput);
      if (username) {
        try {
          console.log(`⚡ Auto-connecting ${item.platform} profile for user ${userId} (${username})...`);
          await connectPlatformService(userId, item.platform, username);
        } catch (err) {
          console.error(`⚠️ Notice: Could not auto-connect ${item.platform} (${username}):`, err.message);
        }
      }
    }
  }
};

// GET /api/v1/profile
export const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });

    res.status(200).json({
      success: true,
      onboardingCompleted: req.user.onboardingCompleted,
      profile: profile || null,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/onboarding
export const submitOnboarding = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Check if onboarding is already completed
    if (req.user.onboardingCompleted) {
      return res.status(400).json({
        success: false,
        message: "Onboarding has already been completed. Please use profile editing instead.",
      });
    }

    const {
      college,
      degree,
      branch,
      currentYear,
      graduationYear,
      targetRole,
      dreamCompanies,
      placementGoal,
      preferredDomain,
      skills,
      links,
    } = req.body;

    // Create or update Profile document
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        college: college.trim(),
        degree: degree.trim(),
        branch: branch.trim(),
        currentYear,
        graduationYear: Number(graduationYear),
        targetRole: targetRole.trim(),
        dreamCompanies: Array.isArray(dreamCompanies)
          ? dreamCompanies.map((c) => c.trim()).filter(Boolean)
          : [],
        placementGoal: placementGoal.trim(),
        preferredDomain: preferredDomain.trim(),
        skills: skills || {},
        links: links || {},
      },
      { new: true, upsert: true, runValidators: true }
    );

    // Set user onboardingCompleted = true
    await User.findByIdAndUpdate(userId, { onboardingCompleted: true });

    // 🚀 AUTO-CONNECT INTEGRATIONS THEN AND THERE IF LINKS WERE ENTERED!
    await autoConnectProvidedPlatforms(userId, links);

    res.status(201).json({
      success: true,
      message: "Onboarding completed and profile links connected successfully!",
      profile,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/profile
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const {
      college,
      degree,
      branch,
      currentYear,
      graduationYear,
      targetRole,
      dreamCompanies,
      placementGoal,
      preferredDomain,
      skills,
      links,
    } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      {
        college: college.trim(),
        degree: degree.trim(),
        branch: branch.trim(),
        currentYear,
        graduationYear: Number(graduationYear),
        targetRole: targetRole.trim(),
        dreamCompanies: Array.isArray(dreamCompanies)
          ? dreamCompanies.map((c) => c.trim()).filter(Boolean)
          : [],
        placementGoal: placementGoal.trim(),
        preferredDomain: preferredDomain.trim(),
        skills: skills || {},
        links: links || {},
      },
      { new: true, upsert: true, runValidators: true }
    );

    if (!req.user.onboardingCompleted) {
      await User.findByIdAndUpdate(userId, { onboardingCompleted: true });
    }

    // 🚀 AUTO-CONNECT INTEGRATIONS UPON PROFILE UPDATE IF NEW LINKS ENTERED!
    await autoConnectProvidedPlatforms(userId, links);

    res.status(200).json({
      success: true,
      message: "Profile updated and links synchronized!",
      profile,
    });
  } catch (error) {
    next(error);
  }
};
