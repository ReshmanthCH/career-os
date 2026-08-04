/**
 * Prompt builder for deep Gemini AI DSA evaluation and personalized study planning.
 */
export const buildDSAAnalysisPrompt = (context) => {
  return `
You are a Senior Principal Software Engineer, Tech Lead, and Silicon Valley Technical Interviewer.
You are evaluating a student's complete CareerOS profile, Data Structures & Algorithms (DSA) metrics, resume analysis, and connected coding platform statistics.

STUDENT PROFILE & CONTEXT:
${JSON.stringify(context, null, 2)}

TASK:
Perform an in-depth AI reasoning analysis over the student's complete profile.
Do NOT output generic advice. Analyze their actual topic progress, weak spots, study streak, resume scores, target companies, and platform ratings.

REQUIRED STRICT JSON RESPONSE SCHEMA:
{
  "overallAssessment": "A detailed 2-3 sentence technical recruiter appraisal of where the student currently stands.",
  "interviewReadinessScore": 78,
  "codingConfidence": 82,
  "problemSolvingConfidence": 75,
  "revisionReadiness": 70,
  "contestReadiness": 65,
  "strongestTopics": [
    { "topic": "Arrays", "reason": "High accuracy and 100% problem completion rate." }
  ],
  "weakestTopics": [
    { 
      "topic": "Dynamic Programming", 
      "reason": "0 solved problems logged; high frequency in target company interviews.", 
      "improvementPlan": "Start with classic 1D DP patterns like Climbing Stairs and Coin Change before moving to 2D grid DP." 
    }
  ],
  "missingConcepts": ["Graph Traversal (BFS/DFS)", "Trie Data Structure", "Segment Tree"],
  "recommendations": [
    {
      "title": "Increase Medium Difficulty Proportion",
      "type": "priority",
      "message": "Over 70% of your solved problems are Easy. Top companies require solving Medium problems within 25 minutes."
    }
  ],
  "studyPlan": {
    "dailyPlan": [
      {
        "day": "Day 1 (Today)",
        "tasks": ["Solve 2 Medium Binary Search problems", "Revise 1 Array problem notes"]
      },
      {
        "day": "Day 2 (Tomorrow)",
        "tasks": ["Learn Tree Traversal patterns (Inorder/Preorder/Postorder)", "Solve 1 Easy Tree problem"]
      },
      {
        "day": "Day 3",
        "tasks": ["Solve 2 Medium Tree problems", "Practice 1D Dynamic Programming intro"]
      }
    ],
    "weeklyFocus": ["Master Trees & Binary Search Trees", "Initiate Dynamic Programming foundational patterns"],
    "monthlyGoal": "Reach 50+ total solved problems with at least 30 Medium difficulty problems across Arrays, DP, and Trees."
  },
  "companyReadiness": [
    {
      "company": "Amazon",
      "readinessScore": 72,
      "status": "On Track",
      "importantTopics": ["Arrays & Hashing", "Trees", "BFS/DFS Graphs", "System Design Intro"],
      "missingSkills": ["Graph Traversal", "Topological Sort"],
      "timeline": "Ready in 4-6 weeks of consistent practice"
    },
    {
      "company": "Google",
      "readinessScore": 62,
      "status": "Needs Intensive Practice",
      "importantTopics": ["Dynamic Programming", "Graph Patterns", "Segment Trees", "Advanced Binary Search"],
      "missingSkills": ["Dynamic Programming", "Advanced Graphs"],
      "timeline": "Ready in 8-10 weeks"
    },
    {
      "company": "Microsoft",
      "readinessScore": 75,
      "status": "Competitive Candidate",
      "importantTopics": ["Linked Lists", "Trees", "Arrays", "Strings"],
      "missingSkills": ["Trie Operations"],
      "timeline": "Ready in 3-4 weeks"
    }
  ]
}

Return ONLY valid JSON matching the exact schema above. No markdown wrap errors.
`;
};
