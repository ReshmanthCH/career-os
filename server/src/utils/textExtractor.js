import fs from "fs";
import { createRequire } from "module";
import mammoth from "mammoth";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

/**
 * Extracts readable text from PDF or DOCX resume files.
 * @param {string} filePath - Path to the file on disk
 * @param {string} fileType - 'pdf' or 'docx'
 * @returns {Promise<string>} Extracted text string
 */
export const extractTextFromFile = async (filePath, fileType) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found at path: ${filePath}`);
  }

  const normalizedType = fileType?.toLowerCase().replace(".", "");

  try {
    if (normalizedType === "pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return sanitizeExtractedText(data.text || "");
    }

    if (normalizedType === "docx") {
      const result = await mammoth.extractRawText({ path: filePath });
      return sanitizeExtractedText(result.value || "");
    }

    throw new Error(`Unsupported file type for text extraction: ${fileType}`);
  } catch (error) {
    console.error("Text extraction failed:", error.message);
    return "Resume text extraction unavailable or empty.";
  }
};

/**
 * Cleans extracted text by stripping excess whitespace and control characters.
 */
const sanitizeExtractedText = (rawText) => {
  if (!rawText || typeof rawText !== "string") return "";

  return rawText
    .replace(/[\r\n]+/g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim();
};
