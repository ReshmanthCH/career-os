import axios from "axios";

/**
 * Service to fetch Codeforces profile and submission metrics using Official REST API.
 */
export const fetchCodeforcesData = async (handle) => {
  if (!handle) throw new Error("Codeforces handle is required.");

  try {
    // 1. Fetch User Info
    const userRes = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`, {
      timeout: 10000,
    });

    if (userRes.data?.status !== "OK" || !userRes.data?.result?.length) {
      throw new Error(`Codeforces user "${handle}" was not found.`);
    }

    const userInfo = userRes.data.result[0];

    // 2. Fetch User Status / Submissions to count unique solved problems
    let totalSolved = 0;
    try {
      const statusRes = await axios.get(
        `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=500`,
        { timeout: 10000 }
      );

      if (statusRes.data?.status === "OK" && Array.isArray(statusRes.data.result)) {
        const solvedProblems = new Set();
        statusRes.data.result.forEach((sub) => {
          if (sub.verdict === "OK" && sub.problem) {
            const probId = `${sub.problem.contestId || 0}-${sub.problem.index}`;
            solvedProblems.add(probId);
          }
        });
        totalSolved = solvedProblems.size;
      }
    } catch (statusErr) {
      console.warn("Failed to fetch Codeforces submission history:", statusErr.message);
    }

    return {
      username: userInfo.handle,
      rating: userInfo.rating || 0,
      maxRating: userInfo.maxRating || 0,
      rank: userInfo.rank || "unranked",
      maxRank: userInfo.maxRank || "unranked",
      avatar: userInfo.avatar || userInfo.titlePhoto || "",
      organization: userInfo.organization || "",
      contribution: userInfo.contribution || 0,
      totalSolved,
      lastFetched: new Date(),
    };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(`Codeforces user "${handle}" was not found.`);
    }
    throw new Error(`Codeforces sync failed: ${error.message}`);
  }
};
