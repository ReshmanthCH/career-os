import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getCompanies,
  getBookmarks,
  compareCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  addBookmark,
  removeBookmark,
} from "../controllers/companyController.js";

const router = express.Router();

router.use(protect); // Require authentication

router.get("/", getCompanies);
router.get("/bookmarks", getBookmarks);
router.get("/compare", compareCompanies);
router.get("/:id", getCompanyById);

router.post("/", createCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

router.post("/bookmarks/:id", addBookmark);
router.delete("/bookmarks/:id", removeBookmark);

export default router;
