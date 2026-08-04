import mongoose from "mongoose";

const copilotRoadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    todayPlan: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    weeklyPlan: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    monthlyPlan: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    quarterlyPlan: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    semesterPlan: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    targetCompanies: {
      type: [String],
      default: [],
    },
    estimatedTimeline: {
      type: String,
      default: "3 Months",
    },
    focusAreas: {
      type: [String],
      default: [],
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

const CopilotRoadmap = mongoose.model("CopilotRoadmap", copilotRoadmapSchema);

export default CopilotRoadmap;
