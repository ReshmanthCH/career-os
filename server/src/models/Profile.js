import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Basic Details
    college: {
      type: String,
      required: [true, "College name is required"],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
    },
    branch: {
      type: String,
      required: [true, "Branch/Department is required"],
      trim: true,
    },
    currentYear: {
      type: String,
      required: [true, "Current year is required"],
      enum: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduated"],
    },
    graduationYear: {
      type: Number,
      required: [true, "Graduation year is required"],
    },

    // Career Goals
    targetRole: {
      type: String,
      required: [true, "Target role is required"],
      trim: true,
    },
    dreamCompanies: {
      type: [String],
      default: [],
    },
    placementGoal: {
      type: String,
      required: [true, "Placement goal is required"],
      trim: true,
    },
    preferredDomain: {
      type: String,
      required: [true, "Preferred domain is required"],
      trim: true,
    },

    // Skill Assessment (Beginner, Intermediate, Advanced)
    skills: {
      dsa: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
      },
      programming: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
      },
      webDev: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
      },
      coreCS: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
      },
      aiMl: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
      },
    },

    // Profile Links
    links: {
      github: { type: String, trim: true, default: "" },
      linkedin: { type: String, trim: true, default: "" },
      leetCode: { type: String, trim: true, default: "" },
      codeforces: { type: String, trim: true, default: "" },
      codeChef: { type: String, trim: true, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
