import express from "express";
import {
  adminLogin,
  getAdminStats,
  getAdminUsers,
  getAdminFeedbacks,
} from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Admin Login Endpoint
router.post("/login", adminLogin);

// Protected Admin Endpoints
router.get("/stats", protectAdmin, getAdminStats);
router.get("/users", protectAdmin, getAdminUsers);
router.get("/feedbacks", protectAdmin, getAdminFeedbacks);

export default router;
