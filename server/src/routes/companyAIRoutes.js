import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  analyzeCompanyReadiness,
  getCompanyAIReportData,
  compareCompaniesWithAI,
  getCompanyAIHistoryData,
} from "../controllers/companyAIController.js";

const router = express.Router();

router.use(protect); // Require authentication

router.post("/readiness", analyzeCompanyReadiness);
router.get("/report/:companyId", getCompanyAIReportData);
router.post("/compare", compareCompaniesWithAI);
router.get("/history", getCompanyAIHistoryData);

export default router;
