import mongoose from "mongoose";

const dsaAIAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    overallAssessment: {
      type: String,
      default: "",
    },
    interviewReadinessScore: {
      type: Number,
      default: 0,
    },
    codingConfidence: {
      type: Number,
      default: 0,
    },
    problemSolvingConfidence: {
      type: Number,
      default: 0,
    },
    revisionReadiness: {
      type: Number,
      default: 0,
    },
    contestReadiness: {
      type: Number,
      default: 0,
    },
    strongestTopics: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    weakestTopics: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    missingConcepts: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    recommendations: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    studyPlan: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    companyReadiness: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    analysisVersion: {
      type: String,
      default: "gemini-2.5-flash",
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const DSAAIAnalysis = mongoose.model("DSAAIAnalysis", dsaAIAnalysisSchema);

export default DSAAIAnalysis;
