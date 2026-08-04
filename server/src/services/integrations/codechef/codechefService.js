import axios from "axios";

/**
 * Optional CodeChef Service using public mirror API.
 */
export const fetchCodeChefData = async (username) => {
  if (!username) throw new Error("CodeChef username is required.");

  try {
    const response = await axios.get(`https://codechef-api.vercel.app/handle/${username}`, {
      timeout: 10000,
    });

    const data = response.data;
    if (!data || !data.success) {
      throw new Error(`CodeChef user "${username}" was not found.`);
    }

    return {
      username,
      name: data.name || username,
      stars: data.stars || "1★",
      currentRating: data.currentRating || 0,
      highestRating: data.highestRating || 0,
      globalRank: data.globalRank || 0,
      countryRank: data.countryRank || 0,
      totalSolved: data.totalSolved || 0,
      lastFetched: new Date(),
    };
  } catch (error) {
    throw new Error(`CodeChef sync failed: ${error.message}`);
  }
};
