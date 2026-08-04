import mongoose from "mongoose";

const copilotCareerAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    overallReadiness: {
      type: Number,
      default: 0,
    },
    placementReadiness: {
      type: Number,
      default: 0,
    },
    resumeReadiness: {
      type: Number,
      default: 0,
    },
    dsaReadiness: {
      type: Number,
      default: 0,
    },
    projectReadiness: {
      type: Number,
      default: 0,
    },
    interviewReadiness: {
      type: Number,
      default: 0,
    },
    learningVelocity: {
      type: String,
      default: "Moderate",
    },
    consistencyScore: {
      type: Number,
      default: 70,
    },
    executiveSummary: {
      type: String,
      default: "",
    },
    strengths: {
      type: [String],
      default: [],
    },
    weakAreas: {
      type: [String],
      default: [],
    },
    targetCompanyFit: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    actionPlan: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    promptVersion: {
      type: String,
      default: "1.0",
    },
    modelUsed: {
      type: String,
      default: "gemini-2.5-flash",
    },
  },
  {
    timestamps: true,
  }
);

const CopilotCareerAnalysis = mongoose.model("CopilotCareerAnalysis", copilotCareerAnalysisSchema);

export default CopilotCareerAnalysis;
