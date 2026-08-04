import axios from "axios";

/**
 * Service to fetch user profile, repositories, and statistics from GitHub API.
 */
export const fetchGitHubData = async (username) => {
  if (!username) throw new Error("GitHub username is required.");

  const headers = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "CareerOS-Platform-Integrations",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // 1. Fetch User Profile
    const profileRes = await axios.get(`https://api.github.com/users/${username}`, {
      headers,
      timeout: 10000,
    });
    const profile = profileRes.data;

    // 2. Fetch User Repositories (Up to 100 recent repos)
    const reposRes = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { headers, timeout: 10000 }
    );
    const repos = reposRes.data || [];

    // Calculate aggregated metrics
    let totalStars = 0;
    let totalForks = 0;
    const languagesMap = {};

    const topRepositories = repos
      .filter((r) => !r.fork) // Focus on original projects
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((r) => {
        totalStars += r.stargazers_count || 0;
        totalForks += r.forks_count || 0;

        if (r.language) {
          languagesMap[r.language] = (languagesMap[r.language] || 0) + 1;
        }

        return {
          id: r.id,
          name: r.name,
          fullName: r.full_name,
          htmlUrl: r.html_url,
          description: r.description || "",
          language: r.language || "N/A",
          stars: r.stargazers_count || 0,
          forks: r.forks_count || 0,
          updatedAt: r.updated_at,
        };
      });

    return {
      username: profile.login,
      name: profile.name || profile.login,
      avatarUrl: profile.avatar_url,
      bio: profile.bio || "",
      htmlUrl: profile.html_url,
      publicRepos: profile.public_repos || 0,
      followers: profile.followers || 0,
      following: profile.following || 0,
      totalStars,
      totalForks,
      topLanguages: Object.entries(languagesMap)
        .map(([lang, count]) => ({ language: lang, count }))
        .sort((a, b) => b.count - a.count),
      topRepositories,
      lastFetched: new Date(),
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error(`GitHub user "${username}" was not found.`);
    }
    throw new Error(`GitHub sync failed: ${error.response?.data?.message || error.message}`);
  }
};
