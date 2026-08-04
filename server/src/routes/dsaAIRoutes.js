import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  analyzeDSAWithAI,
  getDSAAIReport,
  chatWithDSAMentor,
  getDSAChatHistoryData,
  clearDSAChatHistoryData,
} from "../controllers/dsaAIController.js";

const router = express.Router();

router.use(protect); // Require JWT Authentication

router.post("/analyze", analyzeDSAWithAI);
router.get("/report", getDSAAIReport);
router.post("/chat", chatWithDSAMentor);
router.get("/chat", getDSAChatHistoryData);
router.delete("/chat", clearDSAChatHistoryData);

export default router;
