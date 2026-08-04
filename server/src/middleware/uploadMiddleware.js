import multer from "multer";
import path from "path";
import fs from "fs";
import os from "os";

// Safe upload directory selection (Vercel serverless uses /tmp directory)
const isVercel = process.env.VERCEL || process.env.NODE_ENV === "production";
const uploadDir = isVercel
  ? path.join(os.tmpdir(), "uploads", "resumes")
  : path.join(process.cwd(), "uploads", "resumes");

try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch (err) {
  console.warn("Upload directory creation notice:", err.message);
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
    } catch (e) {}
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    const userId = req.user ? req.user._id : "guest";
    cb(null, `resume-${userId}-${uniqueSuffix}${ext}`);
  },
});

// File filter (PDF and DOCX only)
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".pdf", ".docx"];
  const allowedMimeTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
  ];

  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedExtensions.includes(ext) || allowedMimeTypes.includes(mime)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only PDF (.pdf) and DOCX (.docx) files are allowed."),
      false
    );
  }
};

// Multer upload instance (Max file size: 5MB)
export const uploadResumeFile = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
}).single("resume");
