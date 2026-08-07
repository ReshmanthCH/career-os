import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
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
      default: "Global / Multi-Region",
    },
    foundedYear: {
      type: Number,
      default: 2000,
    },
    industry: {
      type: String,
      default: "Product Based / Tech",
    },
    category: {
      type: String,
      enum: [
        "Product / Technology",
        "Service / IT",
        "FinTech / Payments",
        "Banking / Financial Services",
        "Startups / Scaleups",
        "Automotive",
      ],
      default: "Product / Technology",
    },
    companyType: {
      type: String,
      default: "Product Based",
    },
    companySize: {
      type: String,
      default: "10,000+ Employees",
    },
    description: {
      type: String,
      default: "",
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
    commonRoles: [{ type: String }],
    engineeringRoles: [{ type: String }],
    technologyAreas: [{ type: String }],
    programmingLanguages: [{ type: String }],
    databases: [{ type: String }],
    cloudTechnologies: [{ type: String }],
    relevantSkills: [{ type: String }],
    dsaImportance: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "High",
    },
    csFundamentalsImportance: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "High",
    },
    systemDesignRelevance: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    projectRelevance: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "High",
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
      dsaWeightage: { type: Number, default: 50 },
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
    sourceInfo: {
      source: {
        type: String,
        default: "Official Career Page & Verified Engineering Benchmarks",
      },
      sourceType: { type: String, default: "Verified Corporate Benchmarks" },
      lastVerified: { type: Date, default: Date.now },
      confidence: { type: String, default: "High" },
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug from companyName before validation if missing
companySchema.pre("validate", function (next) {
  if (this.companyName && !this.slug) {
    this.slug = this.companyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

// Text Search Index
companySchema.index({
  companyName: "text",
  industry: "text",
  category: "text",
  commonRoles: "text",
  engineeringRoles: "text",
  relevantSkills: "text",
});

const Company = mongoose.model("Company", companySchema);

export default Company;
