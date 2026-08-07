import Company from "../models/Company.js";
import CompanyBookmark from "../models/CompanyBookmark.js";
import { seedCompaniesAuto } from "../seed/seedCompanies.js";

/**
 * Ensures company database is automatically seeded if empty.
 */
const ensureCompaniesSeeded = async () => {
  const count = await Company.countDocuments();
  if (count === 0) {
    console.log("🌱 Company database is empty. Auto-seeding 50+ real company records...");
    await seedCompaniesAuto();
  }
};

/**
 * Service to retrieve companies list with search, filtering, and user bookmark status.
 */
export const getCompaniesList = async (queryParams = {}, userId) => {
  await ensureCompaniesSeeded();

  const { search, category, industry, hiringStatus, internshipAvailable, fullTimeAvailable, difficultyLevel, sortBy } = queryParams;

  const filter = {};

  // Clean filter query parameters
  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), "i");
    filter.$or = [
      { companyName: searchRegex },
      { industry: searchRegex },
      { category: searchRegex },
      { companyType: searchRegex },
      { commonRoles: searchRegex },
      { engineeringRoles: searchRegex },
      { relevantSkills: searchRegex },
      { "preparation.importantTopics": searchRegex },
    ];
  }

  if (category && category !== "All") filter.category = category;
  if (industry && industry !== "All") filter.industry = industry;
  if (hiringStatus && hiringStatus !== "All") filter.hiringStatus = hiringStatus;
  if (difficultyLevel && difficultyLevel !== "All") filter.difficultyLevel = difficultyLevel;

  if (internshipAvailable === "true") filter.internshipAvailable = true;
  if (fullTimeAvailable === "true") filter.fullTimeAvailable = true;

  let sortOption = { companyName: 1 };
  if (sortBy === "difficulty") sortOption = { difficultyLevel: -1 };
  if (sortBy === "newest") sortOption = { createdAt: -1 };

  const companies = await Company.find(filter).sort(sortOption);

  // Fetch user's bookmarks to attach isBookmarked flag
  let bookmarkedCompanyIds = new Set();
  if (userId) {
    const userBookmarks = await CompanyBookmark.find({ user: userId });
    bookmarkedCompanyIds = new Set(userBookmarks.map((b) => b.company.toString()));
  }

  const enrichedCompanies = companies.map((comp) => ({
    ...comp.toObject(),
    isBookmarked: bookmarkedCompanyIds.has(comp._id.toString()),
  }));

  return enrichedCompanies;
};

/**
 * Service to retrieve a single company by ID with user bookmark status.
 */
export const getCompanyDetails = async (id, userId) => {
  await ensureCompaniesSeeded();

  let company = null;
  // Support lookup by ObjectId or slug
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    company = await Company.findById(id);
  } else {
    company = await Company.findOne({ slug: id.toLowerCase() });
  }

  if (!company) return null;

  let isBookmarked = false;
  if (userId) {
    const bookmark = await CompanyBookmark.findOne({ user: userId, company: company._id });
    isBookmarked = !!bookmark;
  }

  return {
    ...company.toObject(),
    isBookmarked,
  };
};

/**
 * Service to retrieve user bookmarked companies.
 */
export const getBookmarkedCompaniesList = async (userId) => {
  const bookmarks = await CompanyBookmark.find({ user: userId }).populate("company");
  return bookmarks
    .filter((b) => b.company)
    .map((b) => ({
      ...b.company.toObject(),
      isBookmarked: true,
    }));
};

/**
 * Service to retrieve companies for side-by-side comparison.
 */
export const compareCompaniesList = async (companyIds, userId) => {
  const companies = await Company.find({ _id: { $in: companyIds } });

  let bookmarkedCompanyIds = new Set();
  if (userId) {
    const userBookmarks = await CompanyBookmark.find({ user: userId });
    bookmarkedCompanyIds = new Set(userBookmarks.map((b) => b.company.toString()));
  }

  return companies.map((comp) => ({
    ...comp.toObject(),
    isBookmarked: bookmarkedCompanyIds.has(comp._id.toString()),
  }));
};

/**
 * Service to toggle company bookmark for a user.
 */
export const toggleBookmarkService = async (userId, companyId, action) => {
  if (action === "add") {
    await CompanyBookmark.findOneAndUpdate(
      { user: userId, company: companyId },
      { user: userId, company: companyId },
      { upsert: true, new: true }
    );
    return true;
  } else {
    await CompanyBookmark.findOneAndDelete({ user: userId, company: companyId });
    return false;
  }
};
