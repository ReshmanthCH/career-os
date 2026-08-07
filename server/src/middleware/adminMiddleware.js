import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

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

    // Check if token is for system admin account
    const systemAdminEmail = process.env.ADMIN_EMAIL || "admin@careeros.com";
    if (decoded.role === "admin" || decoded.email === systemAdminEmail) {
      req.admin = {
        id: decoded.id,
        email: decoded.email || systemAdminEmail,
        role: "admin",
      };
      return next();
    }

    // Fallback DB lookup for admin role
    const user = await User.findById(decoded.id).select("-password");
    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access forbidden. Admin privileges required.",
      });
    }

    req.admin = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired admin token.",
    });
  }
};
