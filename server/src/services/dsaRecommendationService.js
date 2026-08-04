/**
 * Rule-based recommendation engine for DSA preparation.
 * Designed to be easily augmented or replaced by Gemini AI in Phase 6C.
 */
export const generateDSARecommendations = (analytics) => {
  const recommendations = [];

  const { totalProblems, solvedProblems, difficultyDistribution, topicWiseProgress, totalRevisions } = analytics;

  if (totalProblems === 0) {
    recommendations.push({
      type: "info",
      title: "Start Tracking Problems",
      message: "Log your first DSA problem to get personalized progress insights and topic analysis.",
    });
    return recommendations;
  }

  // 1. Difficulty distribution recommendations
  const mediumSolved = difficultyDistribution?.Medium?.solved || 0;
  const hardSolved = difficultyDistribution?.Hard?.solved || 0;

  if (solvedProblems >= 5 && mediumSolved < 5) {
    recommendations.push({
      type: "warning",
      title: "Target Medium Difficulty",
      message: "Top product companies focus heavily on Medium problems. Aim to solve at least 15–20 Medium problems.",
    });
  }

  if (solvedProblems >= 20 && hardSolved === 0) {
    recommendations.push({
      type: "suggestion",
      title: "Challenge Yourself with Hard Problems",
      message: "You have built a solid foundation. Try solving 1–2 Hard problems per week to push your problem-solving bounds.",
    });
  }

  // 2. Topic-wise recommendations
  const activeTopics = topicWiseProgress.filter((t) => t.total > 0);
  const unstartedCore = topicWiseProgress.filter(
    (t) => ["Arrays", "Binary Search", "Trees", "Dynamic Programming", "Graph"].includes(t.topic) && t.solved === 0
  );

  if (unstartedCore.length > 0) {
    recommendations.push({
      type: "priority",
      title: `Focus on Core Topic: ${unstartedCore[0].topic}`,
      message: `${unstartedCore[0].topic} is a high-frequency interview topic with no solved problems yet. Add standard patterns here.`,
    });
  }

  // Check for completed topics
  const completedTopics = topicWiseProgress.filter((t) => t.total >= 3 && t.percentage === 100);
  if (completedTopics.length > 0) {
    recommendations.push({
      type: "success",
      title: `Great Mastery in ${completedTopics[0].topic}! 🎉`,
      message: `You've solved 100% of logged problems in ${completedTopics[0].topic}. Keep up the momentum!`,
    });
  }

  // 3. Revision recommendations
  if (solvedProblems >= 5 && totalRevisions < solvedProblems * 0.5) {
    recommendations.push({
      type: "revision",
      title: "Increase Revision Frequency",
      message: "Spaced repetition is critical. Revisit previously solved problems to retain optimal time and space complexity solutions.",
    });
  }

  return recommendations;
};
