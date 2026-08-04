import CopilotConversation from "../../models/CopilotConversation.js";

/**
 * Gets or creates an active conversation session for the user.
 */
export const getOrCreateConversation = async (userId, conversationId = null) => {
  if (conversationId) {
    const existing = await CopilotConversation.findOne({ _id: conversationId, user: userId });
    if (existing) return existing;
  }

  // Create new session if none provided or found
  const newConversation = new CopilotConversation({
    user: userId,
    title: "New Career Advisory Session",
    messages: [
      {
        sender: "copilot",
        text: "Hello! I am your **CareerOS AI Career Copilot**. I have synced your student profile, DSA stats, resume metrics, GitHub repos, and company readiness reports. How can I help guide your career journey today?",
        timestamp: new Date(),
      },
    ],
  });

  await newConversation.save();
  return newConversation;
};

/**
 * Append user message and copilot response to conversation memory.
 */
export const appendMessageToConversation = async (conversationId, userText, copilotText, metadata = {}) => {
  const conversation = await CopilotConversation.findById(conversationId);
  if (!conversation) return null;

  conversation.messages.push({
    sender: "user",
    text: userText,
    timestamp: new Date(),
  });

  conversation.messages.push({
    sender: "copilot",
    text: copilotText,
    timestamp: new Date(),
    metadata,
  });

  // Auto-update title based on first user query if still default
  if (conversation.title === "New Career Advisory Session" && userText) {
    conversation.title = userText.length > 35 ? `${userText.substring(0, 35)}...` : userText;
  }

  conversation.lastMessageAt = new Date();
  await conversation.save();
  return conversation;
};

/**
 * Pin or unpin a conversation.
 */
export const togglePinConversation = async (userId, conversationId) => {
  const conversation = await CopilotConversation.findOne({ _id: conversationId, user: userId });
  if (!conversation) throw new Error("Conversation session not found.");

  conversation.isPinned = !conversation.isPinned;
  await conversation.save();
  return conversation;
};

/**
 * Get all conversations for user sorted by pinned and recency.
 */
export const getUserConversations = async (userId) => {
  return await CopilotConversation.find({ user: userId })
    .sort({ isPinned: -1, lastMessageAt: -1 })
    .select("title isPinned summary lastMessageAt createdAt messages");
};
