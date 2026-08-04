import PlatformProfile from "../models/PlatformProfile.js";
import SyncHistory from "../models/SyncHistory.js";
import {
  connectPlatformService,
  disconnectPlatformService,
  syncPlatformService,
  syncAllPlatformsService,
} from "../services/integrations/syncService.js";

// GET /api/v1/integrations
export const getConnectedPlatforms = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const profiles = await PlatformProfile.find({ user: userId });

    const platformMap = {};
    profiles.forEach((p) => {
      platformMap[p.platform] = p;
    });

    res.status(200).json({
      success: true,
      platforms: platformMap,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/integrations/:platform/connect
export const connectPlatform = async (req, res, next) => {
  try {
    const { platform } = req.params;
    const { username } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({
        success: false,
        message: "Platform username is required.",
      });
    }

    const profile = await connectPlatformService(req.user._id, platform, username);

    res.status(200).json({
      success: true,
      message: `Successfully connected and synced ${platform.toUpperCase()} profile!`,
      profile,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/integrations/:platform
export const disconnectPlatform = async (req, res, next) => {
  try {
    const { platform } = req.params;

    const profile = await disconnectPlatformService(req.user._id, platform);

    res.status(200).json({
      success: true,
      message: `Disconnected ${platform.toUpperCase()} profile.`,
      profile,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/integrations/:platform/sync
export const syncPlatform = async (req, res, next) => {
  try {
    const { platform } = req.params;

    const profile = await syncPlatformService(req.user._id, platform);

    res.status(200).json({
      success: true,
      message: `Successfully synced ${platform.toUpperCase()} data!`,
      profile,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/integrations/sync-all
export const syncAllPlatforms = async (req, res, next) => {
  try {
    const results = await syncAllPlatformsService(req.user._id);

    res.status(200).json({
      success: true,
      message: "Multi-platform sync completed.",
      results,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/integrations/history
export const getSyncHistory = async (req, res, next) => {
  try {
    const history = await SyncHistory.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(15);

    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    next(error);
  }
};
