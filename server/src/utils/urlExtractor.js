/**
 * Deterministic URL Extraction Utility for Resumes.
 * Parses and normalizes LinkedIn and GitHub profile URLs directly from extracted text.
 */

/**
 * Extracts and normalizes a LinkedIn profile URL from raw text.
 * @param {string} text - Raw extracted resume text
 * @returns {string|null} Normalized LinkedIn URL or null
 */
export const extractLinkedInUrl = (text) => {
  if (!text || typeof text !== "string") return null;

  // Regex patterns for LinkedIn profile URLs
  const patterns = [
    /https?:\/\/(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9%_-]+)\/?/i,
    /(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9%_-]+)\/?/i,
    /linkedin\.com\/in\/([a-zA-Z0-9%_-]+)\/?/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      // Clean username from surrounding punctuation or trailing artifacts
      const cleanUsername = match[1].replace(/[\.,\);:\s]+$/, "").trim();
      if (cleanUsername && cleanUsername.length >= 2) {
        return `https://linkedin.com/in/${cleanUsername}`;
      }
    }
  }

  return null;
};

/**
 * Extracts and normalizes a GitHub profile URL from raw text.
 * @param {string} text - Raw extracted resume text
 * @returns {string|null} Normalized GitHub profile URL or null
 */
export const extractGitHubUrl = (text) => {
  if (!text || typeof text !== "string") return null;

  // Reserved non-user paths on GitHub
  const reservedPaths = [
    "features",
    "pricing",
    "enterprise",
    "explore",
    "topics",
    "trending",
    "collections",
    "marketplace",
    "login",
    "signup",
    "about",
    "contact",
    "privacy",
    "terms",
  ];

  // Regex patterns for GitHub profile URLs
  const patterns = [
    /https?:\/\/(?:www\.)?github\.com\/([a-zA-Z0-9%_-]+)\/?/i,
    /(?:www\.)?github\.com\/([a-zA-Z0-9%_-]+)\/?/i,
    /github\.com\/([a-zA-Z0-9%_-]+)\/?/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const cleanUsername = match[1].replace(/[\.,\);:\s]+$/, "").trim();
      if (
        cleanUsername &&
        cleanUsername.length >= 2 &&
        !reservedPaths.includes(cleanUsername.toLowerCase())
      ) {
        return `https://github.com/${cleanUsername}`;
      }
    }
  }

  return null;
};

/**
 * Extracts all social profile links from raw text.
 * @param {string} text - Raw extracted text
 * @returns {{ linkedin: string|null, github: string|null }} Extracted URLs object
 */
export const extractUrlsFromText = (text) => {
  return {
    linkedin: extractLinkedInUrl(text),
    github: extractGitHubUrl(text),
  };
};
