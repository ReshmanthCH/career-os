import axios from "axios";

/**
 * Robust CodeChef integration service.
 * Fetches and parses profile statistics directly from official CodeChef profile.
 */
export const fetchCodeChefData = async (username) => {
  if (!username || !username.trim()) {
    throw new Error("CodeChef username is required.");
  }

  const cleanUsername = username.trim();

  try {
    const url = `https://www.codechef.com/users/${cleanUsername}`;
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      timeout: 12000,
    });

    const html = response.data || "";

    // CodeChef returns 200 even for non-existent users, but with generic non-profile title/meta
    const ogTitle = html.match(/<meta property="og:title" content="([^"]+)"/i)?.[1] || "";
    const pageTitle = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "";
    const isProfilePage =
      ogTitle.includes("CodeChef User Profile") ||
      pageTitle.includes("CodeChef User Profile") ||
      html.includes("rating-number") ||
      html.includes("rating-header");

    if (!isProfilePage || html.includes("Could not find page") || html.includes("User not found")) {
      throw new Error(`CodeChef user "${cleanUsername}" was not found.`);
    }

    // Extract Rating
    const ratingMatch =
      html.match(/<div class="rating-number">\s*(\d+)/i) ||
      html.match(/class="rating-number"[^>]*>\s*(\d+)/i) ||
      html.match(/rating-number[^>]*>\s*(\d+)/i);
    const currentRating = ratingMatch ? parseInt(ratingMatch[1], 10) : 0;

    // Extract Highest Rating
    const highestRatingMatch =
      html.match(/Highest Rating\s*(\d+)/i) || html.match(/\(Highest Rating\s*(\d+)\)/i);
    const highestRating = highestRatingMatch ? parseInt(highestRatingMatch[1], 10) : currentRating;

    // Determine Stars (based on rating tier)
    let stars = "1★";
    if (currentRating >= 2500) stars = "7★";
    else if (currentRating >= 2200) stars = "6★";
    else if (currentRating >= 2000) stars = "5★";
    else if (currentRating >= 1800) stars = "4★";
    else if (currentRating >= 1600) stars = "3★";
    else if (currentRating >= 1400) stars = "2★";
    else stars = "1★";

    // Extract Ranks
    const globalRankMatch =
      html.match(/Global Rank:?\s*<[^>]+>\s*(\d+)/i) ||
      html.match(/global-rank[^>]*>\s*(\d+)/i) ||
      html.match(/Global Rank:?\s*(\d+)/i);
    const countryRankMatch =
      html.match(/Country Rank:?\s*<[^>]+>\s*(\d+)/i) ||
      html.match(/country-rank[^>]*>\s*(\d+)/i) ||
      html.match(/Country Rank:?\s*(\d+)/i);

    const globalRank = globalRankMatch ? parseInt(globalRankMatch[1], 10) : 0;
    const countryRank = countryRankMatch ? parseInt(countryRankMatch[1], 10) : 0;

    // Extract Problems Solved
    const solvedMatch =
      html.match(/Fully Solved\s*\(([\d,]+)\)/i) ||
      html.match(/Total Problems Solved:\s*([\d,]+)/i) ||
      html.match(/Solved\s*\(([\d,]+)\)/i);
    const totalSolved = solvedMatch ? parseInt(solvedMatch[1].replace(/,/g, ""), 10) : 0;

    // Extract Name
    const nameMatch =
      html.match(/<h1[^>]*class="h2-style"[^>]*>([\s\S]*?)<\/h1>/i) ||
      html.match(/<h2[^>]*>([^<]+)<\/h2>/i);
    const name = nameMatch ? nameMatch[1].replace(/<[^>]+>/g, "").trim() : cleanUsername;

    return {
      username: cleanUsername,
      name: name || cleanUsername,
      stars,
      currentRating,
      highestRating,
      globalRank,
      countryRank,
      totalSolved,
      lastFetched: new Date(),
    };
  } catch (error) {
    if (error.message.includes("was not found")) {
      throw error;
    }

    // Secondary API fallback if direct scrape is blocked by network policy
    try {
      const fallbackUrl = `https://codechef-api.vercel.app/handle/${cleanUsername}`;
      const fallbackRes = await axios.get(fallbackUrl, { timeout: 6000 });
      if (fallbackRes.data && fallbackRes.data.success) {
        const d = fallbackRes.data;
        return {
          username: cleanUsername,
          name: d.name || cleanUsername,
          stars: d.stars || "1★",
          currentRating: d.currentRating || 0,
          highestRating: d.highestRating || 0,
          globalRank: d.globalRank || 0,
          countryRank: d.countryRank || 0,
          totalSolved: d.totalSolved || 0,
          lastFetched: new Date(),
        };
      }
    } catch (fallbackErr) {
      // Ignore fallback error and throw primary error message
    }

    throw new Error(`CodeChef sync failed: ${error.message}`);
  }
};
