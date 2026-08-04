import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getDSAProblems,
  getDSAAnalyticsData,
  getDSAProblemById,
  createDSAProblem,
  updateDSAProblem,
  deleteDSAProblem,
  reviseDSAProblem,
} from "../controllers/dsaController.js";

const router = express.Router();

router.use(protect); // All DSA routes require authentication

router.get("/", getDSAProblems);
router.get("/analytics", getDSAAnalyticsData);
router.get("/:id", getDSAProblemById);
router.post("/", createDSAProblem);
router.put("/:id", updateDSAProblem);
router.delete("/:id", deleteDSAProblem);
router.post("/revise/:id", reviseDSAProblem);

export default router;
