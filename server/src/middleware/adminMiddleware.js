import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";
import mongoose from "mongoose";

export const protectAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Admin authorization token required.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired admin session token.",
      });
    }

    const systemAdminEmail = process.env.ADMIN_EMAIL || "admin@careeros.com";

    // 1. Check if token belongs to system administrator
    if (
      decoded.role === "admin" ||
      decoded.id === "system-admin-id" ||
      (decoded.email && decoded.email.toLowerCase() === systemAdminEmail.toLowerCase())
    ) {
      req.admin = {
        id: decoded.id || "system-admin-id",
        email: decoded.email || systemAdminEmail,
        role: "admin",
      };
      return next();
    }

    // 2. Safely check MongoDB User collection for admin role
    if (mongoose.Types.ObjectId.isValid(decoded.id)) {
      const user = await User.findById(decoded.id).select("-password");
      if (user && user.role === "admin") {
        req.admin = user;
        return next();
      }
    }

    return res.status(403).json({
      success: false,
      message: "Access forbidden. Admin privileges required.",
    });
  } catch (error) {
    console.error("Admin middleware auth error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired admin token.",
    });
  }
};
