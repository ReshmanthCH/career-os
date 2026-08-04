import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { validateProfileData } from "../middleware/validateProfileMiddleware.js";
import { getProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/", protect, getProfile);
router.put("/", protect, validateProfileData, updateProfile);

export default router;
