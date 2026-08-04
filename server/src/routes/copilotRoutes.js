import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  handleChat,
  handleGenerateCareerAnalysis,
  getLatestCareerAnalysis,
  handleGenerateRoadmap,
  getLatestRoadmap,
  handleGenerateRecommendations,
  getLatestRecommendations,
  getHistory,
  getHistoryById,
  deleteHistory,
  togglePin,
} from "../controllers/copilotController.js";

const router = express.Router();

// Apply Auth Guard to all Copilot routes
router.use(protect);

router.post("/chat", handleChat);

router.post("/career-analysis", handleGenerateCareerAnalysis);
router.get("/career-analysis", getLatestCareerAnalysis);

router.post("/roadmap", handleGenerateRoadmap);
router.get("/roadmap", getLatestRoadmap);

router.post("/recommendations", handleGenerateRecommendations);
router.get("/recommendations", getLatestRecommendations);

router.get("/history", getHistory);
router.get("/history/:id", getHistoryById);
router.delete("/history/:id", deleteHistory);
router.post("/pin/:id", togglePin);

export default router;
