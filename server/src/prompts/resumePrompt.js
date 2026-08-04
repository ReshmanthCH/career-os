/**
 * Reusable prompt builder for Gemini AI Resume Intelligence analysis.
 * Strict JSON output specification.
 */
export const buildResumeAnalysisPrompt = (resumeText, studentProfile = {}) => {
  const profileContext = `
Student Context:
- Target Role: ${studentProfile.targetRole || "Software Development Engineer"}
- Preferred Domain: ${studentProfile.preferredDomain || "Full Stack / Web Development"}
- College: ${studentProfile.college || "Engineering College"}
- Branch: ${studentProfile.branch || "Computer Science"}
- Graduation Year: ${studentProfile.graduationYear || "2026"}
- Placement Goal: ${studentProfile.placementGoal || "Top Product Based Companies"}
  `;

  return `
You are an expert Silicon Valley Technical Recruiter and Applicant Tracking System (ATS) Specialist.
Analyze the following student resume text and compare it against modern software engineering industry standards.

${profileContext}

RESUME TEXT TO ANALYZE:
"""
${resumeText}
"""

INSTRUCTIONS:
You MUST respond with a valid JSON object ONLY. Do NOT include markdown code fences (\`\`\`json ... \`\`\`), greetings, or explanatory text outside the JSON structure.

JSON RESPONSE SCHEMA:
{
  "overallScore": <integer 0-100 representing overall quality>,
  "atsScore": <integer 0-100 representing ATS pass likelihood>,
  "recruiterImpression": "<A 2-sentence summary of how a top tech recruiter views this resume>",
  "strengths": [
    "<Strong point 1 with specific evidence>",
    "<Strong point 2 with specific evidence>",
    "<Strong point 3 with specific evidence>"
  ],
  "weaknesses": [
    "<Weakness 1 to fix>",
    "<Weakness 2 to fix>"
  ],
  "missingSections": [
    "<Missing key section 1>",
    "<Missing key section 2>"
  ],
  "projectSuggestions": [
    "<Actionable tip to make projects more impactful using metrics and tech stack>"
  ],
  "skillSuggestions": [
    "<Key trending technologies or tools missing for target role>"
  ],
  "grammarSuggestions": [
    "<Grammar, active verb, or formatting phrasing correction>"
  ],
  "companyRecommendations": {
    "Google": "<Specific advice to pass Google engineering resume screen>",
    "Amazon": "<Specific advice aligning with Amazon Leadership Principles>",
    "Microsoft": "<Specific advice for Microsoft software engineering roles>",
    "ProductStartups": "<Advice for high-growth tech startups>"
  },
  "improvedSummary": "<An upgraded, compelling 2-sentence professional summary for the resume header>",
  "improvedProjectDescriptions": [
    {
      "title": "<Project Name>",
      "original": "<Original bullet point or snippet>",
      "improved": "<Action-oriented ATS-optimized bullet point with metrics (e.g. Developed X using Y resulting in Z% speedup)>"
    }
  ],
  "nextSteps": [
    "<Immediate action step 1>",
    "<Immediate action step 2>"
  ]
}
`;
};
