import { getDashboardData } from "../services/dashboardService.js";

// GET /api/v1/dashboard
export const getDashboard = async (req, res, next) => {
  try {
    const dashboardData = await getDashboardData(req.user._id);

    res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully.",
      data: dashboardData,
    });
  } catch (error) {
    next(error);
  }
};
