import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { validateProfileData } from "../middleware/validateProfileMiddleware.js";
import { submitOnboarding } from "../controllers/profileController.js";

const router = express.Router();

router.post("/", protect, validateProfileData, submitOnboarding);

export default router;
