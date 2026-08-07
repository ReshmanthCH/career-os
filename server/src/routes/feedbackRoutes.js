import express from "express";
import { submitFeedback } from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected Student Feedback Endpoint
router.post("/", protect, submitFeedback);

export default router;
