import PlatformProfile from "../../models/PlatformProfile.js";
import SyncHistory from "../../models/SyncHistory.js";
import { fetchGitHubData } from "./github/githubService.js";
import { fetchLeetCodeData } from "./leetcode/leetcodeService.js";
import { fetchCodeforcesData } from "./codeforces/codeforcesService.js";
import { fetchCodeChefData } from "./codechef/codechefService.js";

/**
 * Service to connect a user's platform account.
 */
export const connectPlatformService = async (userId, platform, username) => {
  const normalizedPlatform = platform.toLowerCase();
  const trimmedUsername = username.trim();

  // Validate connection by performing initial data fetch
  const stats = await fetchPlatformData(normalizedPlatform, trimmedUsername);

  let profile = await PlatformProfile.findOne({ user: userId, platform: normalizedPlatform });

  if (profile) {
    profile.username = trimmedUsername;
    profile.isConnected = true;
    profile.lastSynced = new Date();
    profile.syncStatus = "success";
    profile.errorMessage = "";
    profile.stats = stats;
  } else {
    profile = new PlatformProfile({
      user: userId,
      platform: normalizedPlatform,
      username: trimmedUsername,
      isConnected: true,
      lastSynced: new Date(),
      syncStatus: "success",
      errorMessage: "",
      stats,
    });
  }

  await profile.save();

  // Log to SyncHistory
  await SyncHistory.create({
    user: userId,
    platform: normalizedPlatform,
    status: "success",
    itemsImported: stats.totalSolved || stats.publicRepos || 0,
    details: `Connected & initial sync completed for ${trimmedUsername}`,
  });

  return profile;
};

/**
 * Service to disconnect a user's platform account.
 */
export const disconnectPlatformService = async (userId, platform) => {
  const normalizedPlatform = platform.toLowerCase();

  const profile = await PlatformProfile.findOne({ user: userId, platform: normalizedPlatform });
  if (!profile) {
    throw new Error(`No connected ${platform} profile found.`);
  }

  profile.isConnected = false;
  profile.syncStatus = "idle";
  await profile.save();

  return profile;
};

/**
 * Service to sync a single platform.
 */
export const syncPlatformService = async (userId, platform) => {
  const normalizedPlatform = platform.toLowerCase();

  const profile = await PlatformProfile.findOne({
    user: userId,
    platform: normalizedPlatform,
    isConnected: true,
  });

  if (!profile) {
    throw new Error(`Platform ${platform} is not connected.`);
  }

  profile.syncStatus = "syncing";
  await profile.save();

  try {
    const stats = await fetchPlatformData(normalizedPlatform, profile.username);

    profile.stats = stats;
    profile.lastSynced = new Date();
    profile.syncStatus = "success";
    profile.errorMessage = "";
    await profile.save();

    await SyncHistory.create({
      user: userId,
      platform: normalizedPlatform,
      status: "success",
      itemsImported: stats.totalSolved || stats.publicRepos || 0,
      details: `Successfully synced ${profile.username}`,
    });

    return profile;
  } catch (error) {
    profile.syncStatus = "error";
    profile.errorMessage = error.message;
    await profile.save();

    await SyncHistory.create({
      user: userId,
      platform: normalizedPlatform,
      status: "failed",
      itemsImported: 0,
      details: `Sync failed: ${error.message}`,
    });

    throw error;
  }
};

/**
 * Service to sync all connected platforms.
 */
export const syncAllPlatformsService = async (userId) => {
  const connectedProfiles = await PlatformProfile.find({ user: userId, isConnected: true });

  const results = [];

  for (const prof of connectedProfiles) {
    try {
      const updated = await syncPlatformService(userId, prof.platform);
      results.push({ platform: prof.platform, success: true, profile: updated });
    } catch (err) {
      results.push({ platform: prof.platform, success: false, error: err.message });
    }
  }

  return results;
};

/**
 * Dispatcher to fetch stats based on platform type.
 */
const fetchPlatformData = async (platform, username) => {
  switch (platform) {
    case "github":
      return await fetchGitHubData(username);
    case "leetcode":
      return await fetchLeetCodeData(username);
    case "codeforces":
      return await fetchCodeforcesData(username);
    case "codechef":
      return await fetchCodeChefData(username);
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
};
