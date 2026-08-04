import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getConnectedPlatforms,
  connectPlatform,
  disconnectPlatform,
  syncPlatform,
  syncAllPlatforms,
  getSyncHistory,
} from "../controllers/integrationController.js";

const router = express.Router();

router.use(protect); // All platform integration routes require JWT auth

router.get("/", getConnectedPlatforms);
router.post("/sync-all", syncAllPlatforms);
router.get("/history", getSyncHistory);

router.post("/:platform/connect", connectPlatform);
router.delete("/:platform", disconnectPlatform);
router.post("/:platform/sync", syncPlatform);

export default router;
