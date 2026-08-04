import mongoose from "mongoose";

const recommendationItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ["DSA", "Resume", "GitHub", "Projects", "CompanyPrep", "General"], default: "General" },
  priority: { type: String, enum: ["Critical", "High", "Medium", "Low"], default: "Medium" },
  rationale: { type: String, required: true },
  actionItems: { type: [String], default: [] },
  isDismissed: { type: Boolean, default: false },
});

const copilotRecommendationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: [recommendationItemSchema],
    summaryNote: {
      type: String,
      default: "",
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

const CopilotRecommendation = mongoose.model("CopilotRecommendation", copilotRecommendationSchema);

export default CopilotRecommendation;
