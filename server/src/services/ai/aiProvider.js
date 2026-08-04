import { callGeminiAPI, callGeminiChat } from "../geminiService.js";

/**
 * AI Provider Abstraction Interface.
 * Allows swapping Gemini with OpenAI, Claude, or local LLMs with zero controller refactoring.
 */
export class AIProvider {
  /**
   * Generates structured JSON analysis.
   */
  static async generateJSON(promptText) {
    return await callGeminiAPI(promptText);
  }

  /**
   * Generates conversational text responses for AI Chat.
   */
  static async generateChat(promptText, chatHistory = []) {
    return await callGeminiChat(promptText, chatHistory);
  }

  /**
   * Generates text responses from prompt.
   */
  static async generateText(promptText) {
    return await callGeminiChat(promptText, []);
  }
}
