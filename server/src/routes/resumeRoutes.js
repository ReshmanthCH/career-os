import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { uploadResumeFile } from "../middleware/uploadMiddleware.js";
import {
  uploadResume,
  getResume,
  getResumeReport,
  aiAnalyzeResume,
  reanalyzeResumeById,
  deleteResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.get("/", protect, getResume);
router.post("/upload", protect, uploadResumeFile, uploadResume);
router.post("/ai-analyze", protect, aiAnalyzeResume);
router.get("/report/:id", protect, getResumeReport);
router.post("/reanalyze/:id", protect, reanalyzeResumeById);
router.delete("/:id", protect, deleteResume);

export default router;
