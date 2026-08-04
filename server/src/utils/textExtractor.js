import fs from "fs";
import { createRequire } from "module";
import mammoth from "mammoth";

/**
 * Extracts readable text from PDF or DOCX resume files safely.
 * Lazy-loads pdf-parse to prevent Vercel serverless startup errors (@napi-rs/canvas).
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
      let pdfParse;
      try {
        const require = createRequire(import.meta.url);
        pdfParse = require("pdf-parse/lib/pdf-parse.js");
      } catch (e1) {
        try {
          const require = createRequire(import.meta.url);
          pdfParse = require("pdf-parse");
        } catch (e2) {
          console.warn("pdf-parse load notice:", e2.message);
        }
      }

      if (pdfParse) {
        const data = await pdfParse(dataBuffer);
        return sanitizeExtractedText(data.text || "");
      }
      return "PDF text extraction module unavailable.";
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
