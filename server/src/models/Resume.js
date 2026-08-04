import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
      enum: ["pdf", "docx"],
    },
    fileSize: {
      type: Number,
      required: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    overallScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    atsScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    improvements: {
      type: [String],
      default: [],
    },
    missingSections: {
      type: [String],
      default: [],
    },
    projectSuggestions: {
      type: [String],
      default: [],
    },
    skillSuggestions: {
      type: [String],
      default: [],
    },
    grammarSuggestions: {
      type: [String],
      default: [],
    },
    companyRecommendations: {
      Google: { type: String, default: "" },
      Amazon: { type: String, default: "" },
      Microsoft: { type: String, default: "" },
      ProductStartups: { type: String, default: "" },
    },
    improvedSummary: {
      type: String,
      default: "",
    },
    improvedProjects: [
      {
        title: { type: String, default: "" },
        original: { type: String, default: "" },
        improved: { type: String, default: "" },
      },
    ],
    recruiterImpression: {
      type: String,
      default: "",
    },
    nextSteps: {
      type: [String],
      default: [],
    },
    analysisVersion: {
      type: String,
      enum: ["ai-v1", "rule-based"],
      default: "rule-based",
    },
    lastAnalyzed: {
      type: Date,
      default: Date.now,
    },
    sectionAnalysis: {
      hasName: { type: Boolean, default: true },
      hasEducation: { type: Boolean, default: true },
      hasSkills: { type: Boolean, default: true },
      hasProjects: { type: Boolean, default: true },
      hasExperience: { type: Boolean, default: false },
      hasCertifications: { type: Boolean, default: false },
      hasContactInfo: {
        email: { type: Boolean, default: true },
        phone: { type: Boolean, default: false },
        linkedin: { type: Boolean, default: false },
        github: { type: Boolean, default: false },
      },
    },
    skillAnalysis: {
      skillCount: { type: Number, default: 0 },
      duplicatesCount: { type: Number, default: 0 },
    },
    projectAnalysis: {
      projectCount: { type: Number, default: 0 },
      hasDescriptions: { type: Boolean, default: true },
    },
    formattingChecks: {
      resumeLength: { type: String, default: "1 Page (Optimal)" },
      emptySections: { type: [String], default: [] },
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
