import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  validateRegister,
  validateLogin,
} from "../middleware/validateMiddleware.js";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/me", protect, getCurrentUser);

export default router;