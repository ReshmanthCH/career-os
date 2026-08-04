import mongoose from "mongoose";

const platformProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    platform: {
      type: String,
      enum: ["github", "leetcode", "codeforces", "codechef"],
      required: true,
    },
    username: {
      type: String,
      required: [true, "Platform username is required"],
      trim: true,
    },
    isConnected: {
      type: Boolean,
      default: true,
    },
    lastSynced: {
      type: Date,
      default: null,
    },
    syncStatus: {
      type: String,
      enum: ["idle", "syncing", "success", "error"],
      default: "idle",
    },
    errorMessage: {
      type: String,
      default: "",
    },
    stats: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique platform connection per user
platformProfileSchema.index({ user: 1, platform: 1 }, { unique: true });

const PlatformProfile = mongoose.model("PlatformProfile", platformProfileSchema);

export default PlatformProfile;
