import mongoose from "mongoose";

const companyAIAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    overallReadiness: {
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
    githubReadiness: {
      type: Number,
      default: 0,
    },
    coreCSReadiness: {
      type: Number,
      default: 0,
    },
    interviewReadiness: {
      type: Number,
      default: 0,
    },
    executiveSummary: {
      type: String,
      default: "",
    },
    gapAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    roadmap: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    interviewAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    recommendations: {
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

companyAIAnalysisSchema.index({ user: 1, company: 1 }, { unique: true });

const CompanyAIAnalysis = mongoose.model("CompanyAIAnalysis", companyAIAnalysisSchema);

export default CompanyAIAnalysis;
