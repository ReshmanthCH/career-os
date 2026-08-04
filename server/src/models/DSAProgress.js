import mongoose from "mongoose";

export const ALLOWED_TOPICS = [
  "Arrays",
  "Strings",
  "Linked List",
  "Stack",
  "Queue",
  "Hashing",
  "Binary Search",
  "Recursion",
  "Backtracking",
  "Trees",
  "BST",
  "Heap",
  "Graph",
  "Greedy",
  "Dynamic Programming",
  "Trie",
  "Bit Manipulation",
  "Segment Tree",
];

export const ALLOWED_DIFFICULTIES = ["Easy", "Medium", "Hard"];
export const ALLOWED_STATUSES = ["Not Started", "Attempted", "Solved", "Revised"];
export const ALLOWED_PLATFORMS = [
  "Manual",
  "LeetCode",
  "Codeforces",
  "CodeChef",
  "GeeksforGeeks",
  "Other",
];

const dsaProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    problemName: {
      type: String,
      required: [true, "Problem name is required"],
      trim: true,
    },
    problemUrl: {
      type: String,
      trim: true,
      default: "",
    },
    platform: {
      type: String,
      enum: ALLOWED_PLATFORMS,
      default: "Manual",
    },
    topic: {
      type: String,
      enum: ALLOWED_TOPICS,
      required: [true, "Topic is required"],
    },
    difficulty: {
      type: String,
      enum: ALLOWED_DIFFICULTIES,
      required: [true, "Difficulty is required"],
    },
    status: {
      type: String,
      enum: ALLOWED_STATUSES,
      default: "Not Started",
    },
    attempts: {
      type: Number,
      default: 1,
      min: 1,
    },
    solvedDate: {
      type: Date,
      default: null,
    },
    timeTaken: {
      type: Number, // in minutes
      default: 0,
      min: 0,
    },
    confidenceLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    notes: {
      type: String,
      default: "",
    },
    revisionCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastRevised: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const DSAProgress = mongoose.model("DSAProgress", dsaProgressSchema);

export default DSAProgress;
