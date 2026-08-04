import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      enum: ["user", "copilot", "system"],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { _id: true }
);

const copilotConversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "New Career Advisory Session",
      trim: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    messages: [messageSchema],
    summary: {
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
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const CopilotConversation = mongoose.model("CopilotConversation", copilotConversationSchema);

export default CopilotConversation;
