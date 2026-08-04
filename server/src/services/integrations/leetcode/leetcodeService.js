import axios from "axios";

/**
 * Service to fetch user stats from LeetCode public GraphQL / API endpoints.
 */
export const fetchLeetCodeData = async (username) => {
  if (!username) throw new Error("LeetCode username is required.");

  try {
    // Attempt official GraphQL API first
    const graphqlQuery = {
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              realName
              ranking
              userAvatar
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
          }
          userContestRanking(username: $username) {
            rating
            globalRanking
            topPercentage
          }
        }
      `,
      variables: { username },
    };

    const response = await axios.post("https://leetcode.com/graphql", graphqlQuery, {
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "CareerOS-Platform-Integrations",
      },
      timeout: 10000,
    });

    const data = response.data?.data;
    if (!data || !data.matchedUser) {
      // Fallback: try public mirror if direct GraphQL returns null/blocked
      return await fetchLeetCodeFallback(username);
    }

    const matchedUser = data.matchedUser;
    const submitStats = matchedUser.submitStats?.acSubmissionNum || [];

    const totalSolved = submitStats.find((s) => s.difficulty === "All")?.count || 0;
    const easySolved = submitStats.find((s) => s.difficulty === "Easy")?.count || 0;
    const mediumSolved = submitStats.find((s) => s.difficulty === "Medium")?.count || 0;
    const hardSolved = submitStats.find((s) => s.difficulty === "Hard")?.count || 0;

    const contestInfo = data.userContestRanking || {};

    return {
      username: matchedUser.username,
      realName: matchedUser.profile?.realName || matchedUser.username,
      avatar: matchedUser.profile?.userAvatar || "",
      ranking: matchedUser.profile?.ranking || 0,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      contestRating: Math.round(contestInfo.rating || 0),
      contestGlobalRanking: contestInfo.globalRanking || 0,
      topPercentage: contestInfo.topPercentage || 0,
      lastFetched: new Date(),
    };
  } catch (error) {
    console.warn("LeetCode direct GraphQL error, attempting fallback mirror:", error.message);
    return await fetchLeetCodeFallback(username);
  }
};

/**
 * Fallback fetcher using public API mirror if direct LeetCode GraphQL is rate-limited or blocked.
 */
const fetchLeetCodeFallback = async (username) => {
  try {
    const res = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${username}`, {
      timeout: 10000,
    });

    const data = res.data;
    if (!data || data.errors) {
      throw new Error(`LeetCode user "${username}" was not found.`);
    }

    return {
      username,
      realName: username,
      avatar: data.avatar || "",
      ranking: data.ranking || 0,
      totalSolved: data.totalSolved || 0,
      easySolved: data.easySolved || 0,
      mediumSolved: data.mediumSolved || 0,
      hardSolved: data.hardSolved || 0,
      contestRating: Math.round(data.contributionPoint || 0),
      contestGlobalRanking: data.ranking || 0,
      topPercentage: 0,
      lastFetched: new Date(),
    };
  } catch (err) {
    throw new Error(`LeetCode sync failed for "${username}": ${err.message}`);
  }
};
