import fs from "fs";
import path from "path";
import Resume from "../models/Resume.js";
import { runResumeAIAnalysis } from "../services/resumeAIService.js";

// POST /api/v1/resume/upload
export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a PDF or DOCX file to upload.",
      });
    }

    const userId = req.user._id;
    const file = req.file;
    const fileType = path.extname(file.originalname).replace(".", "").toLowerCase();

    // Find existing or create placeholder Resume doc
    let resume = await Resume.findOne({ user: userId });
    if (!resume) {
      resume = new Resume({
        user: userId,
        fileName: file.filename,
        originalName: file.originalname,
        filePath: file.path,
        fileType,
        fileSize: file.size,
      });
    } else {
      // Remove old file from disk if replaced
      if (fs.existsSync(resume.filePath) && resume.filePath !== file.path) {
        try {
          fs.unlinkSync(resume.filePath);
        } catch (e) {}
      }
      resume.fileName = file.filename;
      resume.originalName = file.originalname;
      resume.filePath = file.path;
      resume.fileType = fileType;
      resume.fileSize = file.size;
      resume.uploadDate = new Date();
    }

    await resume.save();

    // Execute AI Analysis (with Rule-Based Fallback)
    const aiAnalysisResults = await runResumeAIAnalysis(userId, resume);
    Object.assign(resume, aiAnalysisResults);
    await resume.save();

    res.status(201).json({
      success: true,
      message: "Resume uploaded and analyzed successfully!",
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/resume
export const getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id });

    res.status(200).json({
      success: true,
      resume: resume || null,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/resume/report/:id
export const getResumeReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume report not found.",
      });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to this resume report.",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/resume/ai-analyze
export const aiAnalyzeResume = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const resume = await Resume.findOne({ user: userId });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "No uploaded resume found. Please upload a resume first.",
      });
    }

    const aiAnalysisResults = await runResumeAIAnalysis(userId, resume);
    Object.assign(resume, aiAnalysisResults);
    await resume.save();

    res.status(200).json({
      success: true,
      message: "AI analysis completed successfully!",
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/resume/reanalyze/:id
export const reanalyzeResumeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume document not found.",
      });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to analyze this resume.",
      });
    }

    const aiAnalysisResults = await runResumeAIAnalysis(req.user._id, resume);
    Object.assign(resume, aiAnalysisResults);
    await resume.save();

    res.status(200).json({
      success: true,
      message: "Resume re-analyzed successfully!",
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/resume/:id
export const deleteResume = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume document not found.",
      });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this resume.",
      });
    }

    if (fs.existsSync(resume.filePath)) {
      try {
        fs.unlinkSync(resume.filePath);
      } catch (fileErr) {
        console.error("Failed to delete file from disk:", fileErr);
      }
    }

    await Resume.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
