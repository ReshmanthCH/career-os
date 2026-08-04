import mongoose from "mongoose";
import DSAProgress from "../models/DSAProgress.js";
import { calculateDSAAnalytics } from "../services/dsaAnalyticsService.js";
import { generateDSARecommendations } from "../services/dsaRecommendationService.js";

// GET /api/v1/dsa
export const getDSAProblems = async (req, res, next) => {
  try {
    const { topic, difficulty, status, platform, search, sortBy } = req.query;

    const filter = { user: req.user._id };

    if (topic && topic !== "All") filter.topic = topic;
    if (difficulty && difficulty !== "All") filter.difficulty = difficulty;
    if (status && status !== "All") filter.status = status;
    if (platform && platform !== "All") filter.platform = platform;
    if (search && search.trim() !== "") {
      filter.problemName = { $regex: search.trim(), $options: "i" };
    }

    let sortOption = { createdAt: -1 };
    if (sortBy === "oldest") sortOption = { createdAt: 1 };
    if (sortBy === "recentlySolved") sortOption = { solvedDate: -1, updatedAt: -1 };

    const problems = await DSAProgress.find(filter).sort(sortOption);

    res.status(200).json({
      success: true,
      count: problems.length,
      problems,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/dsa/analytics
export const getDSAAnalyticsData = async (req, res, next) => {
  try {
    const analytics = await calculateDSAAnalytics(req.user._id);
    const recommendations = generateDSARecommendations(analytics);

    res.status(200).json({
      success: true,
      analytics,
      recommendations,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/dsa/:id
export const getDSAProblemById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid problem ID format." });
    }

    const problem = await DSAProgress.findById(id);

    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem record not found." });
    }

    if (problem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized access." });
    }

    res.status(200).json({ success: true, problem });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/dsa
export const createDSAProblem = async (req, res, next) => {
  try {
    const {
      problemName,
      problemUrl,
      platform,
      topic,
      difficulty,
      status,
      attempts,
      timeTaken,
      confidenceLevel,
      notes,
    } = req.body;

    if (!problemName || !problemName.trim() || !topic || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Problem name, topic, and difficulty are required.",
      });
    }

    const solvedDate = status === "Solved" || status === "Revised" ? new Date() : null;

    const problem = await DSAProgress.create({
      user: req.user._id,
      problemName: problemName.trim(),
      problemUrl: problemUrl ? problemUrl.trim() : "",
      platform: platform || "Manual",
      topic,
      difficulty,
      status: status || "Not Started",
      attempts: attempts || 1,
      solvedDate,
      timeTaken: timeTaken || 0,
      confidenceLevel: confidenceLevel || "Medium",
      notes: notes ? notes.trim() : "",
    });

    res.status(201).json({
      success: true,
      message: "DSA problem logged successfully!",
      problem,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/dsa/:id
export const updateDSAProblem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid problem ID format." });
    }

    const problem = await DSAProgress.findById(id);

    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem record not found." });
    }

    if (problem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized access." });
    }

    const updates = req.body;

    if (updates.status && (updates.status === "Solved" || updates.status === "Revised") && !problem.solvedDate) {
      updates.solvedDate = new Date();
    }

    const updatedProblem = await DSAProgress.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "DSA problem updated successfully!",
      problem: updatedProblem,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/dsa/:id
export const deleteDSAProblem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid problem ID format." });
    }

    const problem = await DSAProgress.findById(id);

    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem record not found." });
    }

    if (problem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized access." });
    }

    await DSAProgress.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "DSA problem deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/dsa/revise/:id
export const reviseDSAProblem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid problem ID format." });
    }

    const problem = await DSAProgress.findById(id);

    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem record not found." });
    }

    if (problem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized access." });
    }

    problem.revisionCount = (problem.revisionCount || 0) + 1;
    problem.lastRevised = new Date();
    problem.status = "Revised";
    await problem.save();

    res.status(200).json({
      success: true,
      message: `Problem "${problem.problemName}" marked as revised (Count: ${problem.revisionCount})!`,
      problem,
    });
  } catch (error) {
    next(error);
  }
};
