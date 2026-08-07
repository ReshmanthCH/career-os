import User from "../models/User.js";
import Company from "../models/Company.js";
import Profile from "../models/Profile.js";
import Feedback from "../models/Feedback.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";

// POST /api/v1/admin/login
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both admin email and password.",
      });
    }

    const systemAdminEmail = process.env.ADMIN_EMAIL || "admin@careeros.com";
    const systemAdminPassword = process.env.ADMIN_PASSWORD || "Admin@CareerOS2026";

    let isAdminValid = false;
    let adminPayload = null;

    // 1. Check against System Environment Admin Credentials
    if (email.toLowerCase().trim() === systemAdminEmail.toLowerCase() && password === systemAdminPassword) {
      isAdminValid = true;
      adminPayload = {
        _id: "system-admin-id",
        name: "System Administrator",
        email: systemAdminEmail,
        role: "admin",
      };
    } else {
      // 2. Check against MongoDB User collection with role: 'admin'
      const user = await User.findOne({ email: email.toLowerCase().trim() });
      if (user && user.role === "admin") {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          isAdminValid = true;
          adminPayload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: "admin",
          };
        }
      }
    }

    if (!isAdminValid || !adminPayload) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin email or password.",
      });
    }

    // Generate token with role: 'admin'
    const token = generateToken({
      id: adminPayload._id,
      email: adminPayload.email,
      role: "admin",
    });

    res.status(200).json({
      success: true,
      message: "Admin authentication successful.",
      token,
      admin: adminPayload,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/admin/stats
export const getAdminStats = async (req, res, next) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [totalUsers, activeUsers, newUsers, totalCompanies, totalFeedbacks] = await Promise.all([
      User.countDocuments({ role: { $ne: "admin" } }),
      User.countDocuments({ role: { $ne: "admin" }, onboardingCompleted: true }),
      User.countDocuments({ role: { $ne: "admin" }, createdAt: { $gte: sevenDaysAgo } }),
      Company.countDocuments(),
      Feedback.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        newUsers,
        totalCompanies,
        totalFeedbacks,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/admin/users
export const getAdminUsers = async (req, res, next) => {
  try {
    const { search } = req.query;

    const filter = { role: { $ne: "admin" } };

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");
      filter.$or = [{ name: searchRegex }, { email: searchRegex }];
    }

    const users = await User.find(filter)
      .select("_id name email onboardingCompleted createdAt")
      .sort({ createdAt: -1 })
      .lean();

    // Attach targetRole from Profile collection
    const userIds = users.map((u) => u._id);
    const profiles = await Profile.find({ user: { $in: userIds } }).lean();

    const profileMap = new Map();
    profiles.forEach((p) => {
      profileMap.set(p.user.toString(), p);
    });

    const enrichedUsers = users.map((u) => {
      const userProfile = profileMap.get(u._id.toString());
      return {
        _id: u._id,
        name: u.name,
        email: u.email,
        createdAt: u.createdAt,
        onboardingCompleted: u.onboardingCompleted,
        targetRole: userProfile?.targetRole || "N/A",
        preferredDomain: userProfile?.preferredDomain || "N/A",
      };
    });

    res.status(200).json({
      success: true,
      users: enrichedUsers,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/admin/feedbacks
export const getAdminFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      feedbacks,
    });
  } catch (error) {
    next(error);
  }
};
