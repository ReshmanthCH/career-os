/**
 * Prompt builder for Company AI Readiness Evaluation & Tailored Preparation Roadmap.
 */
export const buildCompanyReadinessPrompt = (context) => {
  const companyName = context.targetCompany.companyName;

  return `
You are a Principal Technical Recruiter and Placement Mentor specializing in software engineering hiring at ${companyName}.
You are conducting a comprehensive AI evaluation matching this student's complete profile with ${companyName}'s exact interview standards and expectations.

STUDENT & COMPANY CONTEXT:
${JSON.stringify(context, null, 2)}

TASK:
Analyze the student's actual profile against ${companyName}'s DSA weightage (${context.targetCompany.preparation?.dsaWeightage}%), core subject expectations, resume projects, and platform metrics.
Return a personalized, non-generic JSON evaluation report matching the exact schema below.

REQUIRED STRICT JSON RESPONSE SCHEMA:
{
  "executiveSummary": "A direct 2-3 sentence recruiter assessment of the candidate's match for ${companyName}.",
  "overallReadiness": 72,
  "resumeReadiness": 65,
  "dsaReadiness": 78,
  "projectReadiness": 70,
  "githubReadiness": 60,
  "coreCSReadiness": 75,
  "interviewReadiness": 68,
  "gapAnalysis": {
    "missingDSATopics": ["Dynamic Programming (2D)", "Advanced Graph Traversal"],
    "missingProjects": ["Microservices / Distributed System project expected by ${companyName}"],
    "missingTechnologies": ["Java / Spring Boot", "Docker / AWS"],
    "weakAreas": ["Lack of Hard difficulty problem solving", "0 contest experience"],
    "strongAreas": ["Solid Array and String problem solving foundation"]
  },
  "roadmap": {
    "dailyTasks": [
      { "day": "Day 1 (Today)", "tasks": ["Solve 2 Medium Array problems", "Review ${companyName} OA patterns"] },
      { "day": "Day 2 (Tomorrow)", "tasks": ["Study Binary Tree traversals", "Revise Resume Project architecture"] },
      { "day": "Day 3", "tasks": ["Attempt 1D Dynamic Programming intro", "Practice 1 behavioral story"] }
    ],
    "weeklyPlan": [
      "Week 1: Master Trees and Graphs for ${companyName} technical rounds",
      "Week 2: Deep dive into Dynamic Programming and System Design intro",
      "Week 3: Mock interviews and Resume project refinement"
    ],
    "monthlyPlan": "Reach 100+ solved problems with 60+ Medium problems, 1 published GitHub project, and 80%+ match for ${companyName}.",
    "estimatedTimeline": "Ready in 4-6 weeks of structured preparation"
  },
  "interviewAnalysis": {
    "expectedDifficulty": "${context.targetCompany.difficultyLevel} Tier",
    "likelyDSATopics": ["Arrays & Hashing", "Trees", "BFS/DFS Graphs", "Dynamic Programming"],
    "likelyResumeQuestions": [
      "Walk me through the architecture of your primary project.",
      "How did you optimize database queries or API latency?"
    ],
    "likelyBehavioralQuestions": [
      "Tell me about a time you faced a tough bug under a deadline.",
      "How do you handle disagreement in technical design?"
    ]
  },
  "recommendations": [
    {
      "title": "Build ${companyName} Specific Project",
      "type": "priority",
      "message": "Add a distributed backend or cloud service project to your resume to align with ${companyName}'s preferred technologies."
    }
  ]
}

Return ONLY valid JSON matching the exact schema above. No markdown code wraps.
`;
};
