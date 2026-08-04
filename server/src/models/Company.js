import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      unique: true,
      trim: true,
    },
    logo: {
      type: String,
      default: "🏢",
    },
    website: {
      type: String,
      default: "",
    },
    careersPage: {
      type: String,
      default: "",
    },
    headquarters: {
      type: String,
      default: "USA / Global",
    },
    foundedYear: {
      type: Number,
      default: 2000,
    },
    industry: {
      type: String,
      default: "Product Based / Tech",
    },
    companySize: {
      type: String,
      default: "10,000+ Employees",
    },
    hiringStatus: {
      type: String,
      enum: ["Actively Hiring", "Hiring Soon", "Selective"],
      default: "Actively Hiring",
    },
    internshipAvailable: {
      type: Boolean,
      default: true,
    },
    fullTimeAvailable: {
      type: Boolean,
      default: true,
    },
    difficultyLevel: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Hard",
    },
    interviewProcess: {
      onlineAssessment: { type: String, default: "2 DSA Problems + Aptitude" },
      technicalRounds: { type: Number, default: 3 },
      hrRounds: { type: Number, default: 1 },
      systemDesignRequired: { type: Boolean, default: true },
      behavioralInterview: { type: Boolean, default: true },
    },
    preparation: {
      importantTopics: [{ type: String }],
      dsaWeightage: { type: Number, default: 50 }, // percentage
      coreSubjectsWeightage: { type: Number, default: 20 },
      developmentWeightage: { type: Number, default: 20 },
      aptitudeWeightage: { type: Number, default: 10 },
    },
    resumeExpectations: {
      preferredProjects: [{ type: String }],
      preferredSkills: [{ type: String }],
      requiredTechnologies: [{ type: String }],
    },
    compensation: {
      internshipCTC: { type: String, default: "₹50,000 - ₹1,00,000 / month" },
      fresherCTC: { type: String, default: "₹18 - ₹30 LPA" },
    },
    timeline: {
      hiringMonths: [{ type: String }],
    },
    resources: {
      preparationResources: [{ type: String }],
      officialLinks: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

// Search Index
companySchema.index({ companyName: "text", industry: "text" });

const Company = mongoose.model("Company", companySchema);

export default Company;
