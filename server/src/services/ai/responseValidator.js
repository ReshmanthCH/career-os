/**
 * Validates JSON structure returned by Gemini AI to ensure safety & completeness.
 */
export const validateDSAAIResponse = (data) => {
  if (!data || typeof data !== "object") return false;

  const requiredFields = [
    "overallAssessment",
    "interviewReadinessScore",
    "codingConfidence",
    "strongestTopics",
    "weakestTopics",
    "studyPlan",
  ];

  return requiredFields.every((field) => data[field] !== undefined);
};
