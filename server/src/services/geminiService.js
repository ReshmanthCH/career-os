import { GoogleGenAI } from "@google/genai";

let currentKeyIndex = 0;

/**
 * Returns all configured Gemini API keys from .env
 */
const getApiKeys = () => {
  const keysStr = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || "";
  const keys = keysStr
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  return keys.length > 0 ? keys : ["your_gemini_api_key_here"];
};

/**
 * Gets next active API key with automatic round-robin rotation
 */
const getNextApiKey = () => {
  const keys = getApiKeys();
  const key = keys[currentKeyIndex % keys.length];
  currentKeyIndex = (currentKeyIndex + 1) % keys.length;
  return key;
};

/**
 * Dedicated service for interacting with Google Gemini API with Key Rotation.
 */
export const callGeminiAPI = async (promptText) => {
  const keys = getApiKeys();
  const models = ["gemini-2.5-flash", "gemini-flash-latest", "gemini-2.0-flash"];

  for (let keyAttempt = 0; keyAttempt < keys.length; keyAttempt++) {
    const apiKey = getNextApiKey();
    if (!apiKey || apiKey === "your_gemini_api_key_here") continue;

    const ai = new GoogleGenAI({ apiKey });

    for (const model of models) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: promptText,
        });

        const rawText = response.text;
        if (rawText) {
          const cleanedText = rawText
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

          const parsedJson = JSON.parse(cleanedText);
          return parsedJson;
        }
      } catch (error) {
        console.warn(`Gemini API warning (Key ${keyAttempt + 1}, Model: ${model}):`, error.message);
        if (error.message.includes("quota") || error.message.includes("429")) {
          break;
        }
      }
    }
  }

  return null;
};

/**
 * Service to handle conversational AI chat using Gemini with Key Rotation.
 */
export const callGeminiChat = async (promptText) => {
  const keys = getApiKeys();
  const models = ["gemini-2.5-flash", "gemini-flash-latest", "gemini-2.0-flash"];

  for (let keyAttempt = 0; keyAttempt < keys.length; keyAttempt++) {
    const apiKey = getNextApiKey();
    if (!apiKey || apiKey === "your_gemini_api_key_here") continue;

    const ai = new GoogleGenAI({ apiKey });

    for (const model of models) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: promptText,
        });

        if (response.text) return response.text;
      } catch (error) {
        console.warn(`Gemini Chat warning (Key ${keyAttempt + 1}, Model: ${model}):`, error.message);
        if (error.message.includes("quota") || error.message.includes("429")) {
          break;
        }
      }
    }
  }

  return "Gemini AI service is currently undergoing heavy load across keys. Please retry in a few seconds.";
};
