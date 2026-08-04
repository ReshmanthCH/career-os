import mongoose from "mongoose";
import Company from "../models/Company.js";
import {
  getCompaniesList,
  getCompanyDetails,
  getBookmarkedCompaniesList,
  compareCompaniesList,
  toggleBookmarkService,
} from "../services/companyService.js";

// GET /api/v1/companies
export const getCompanies = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null;
    const companies = await getCompaniesList(req.query, userId);

    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/companies/bookmarks
export const getBookmarks = async (req, res, next) => {
  try {
    const companies = await getBookmarkedCompaniesList(req.user._id);

    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/companies/compare?ids=id1,id2
export const compareCompanies = async (req, res, next) => {
  try {
    const { ids } = req.query;
    if (!ids) {
      return res.status(400).json({
        success: false,
        message: "Please provide company IDs to compare.",
      });
    }

    const companyIds = ids.split(",").map((id) => id.trim()).filter((id) => mongoose.Types.ObjectId.isValid(id));
    const userId = req.user ? req.user._id : null;
    const companies = await compareCompaniesList(companyIds, userId);

    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/companies/:id
export const getCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid company ID format." });
    }

    const userId = req.user ? req.user._id : null;
    const company = await getCompanyDetails(id, userId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found.",
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/companies
export const createCompany = async (req, res, next) => {
  try {
    const company = await Company.create(req.body);

    res.status(201).json({
      success: true,
      message: "Company created successfully!",
      company,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/companies/:id
export const updateCompany = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid company ID format." });
    }

    const company = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found." });
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully!",
      company,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/companies/:id
export const deleteCompany = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid company ID format." });
    }

    const company = await Company.findByIdAndDelete(id);
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found." });
    }

    res.status(200).json({
      success: true,
      message: "Company profile deleted.",
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/companies/bookmarks/:id
export const addBookmark = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid company ID format." });
    }

    await toggleBookmarkService(req.user._id, id, "add");

    res.status(200).json({
      success: true,
      message: "Company bookmarked!",
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/companies/bookmarks/:id
export const removeBookmark = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid company ID format." });
    }

    await toggleBookmarkService(req.user._id, id, "remove");

    res.status(200).json({
      success: true,
      message: "Company bookmark removed.",
    });
  } catch (error) {
    next(error);
  }
};
