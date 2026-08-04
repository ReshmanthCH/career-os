import mongoose from "mongoose";

const syncHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    platform: {
      type: String,
      enum: ["github", "leetcode", "codeforces", "codechef", "all"],
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed"],
      required: true,
    },
    itemsImported: {
      type: Number,
      default: 0,
    },
    details: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const SyncHistory = mongoose.model("SyncHistory", syncHistorySchema);

export default SyncHistory;
