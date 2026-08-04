import express from "express";
import cors from "cors";
import path from "path";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import onboardingRoutes from "./routes/onboardingRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import dsaRoutes from "./routes/dsaRoutes.js";
import integrationRoutes from "./routes/integrationRoutes.js";
import dsaAIRoutes from "./routes/dsaAIRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import companyAIRoutes from "./routes/companyAIRoutes.js";
import copilotRoutes from "./routes/copilotRoutes.js";

import errorHandler from "./middleware/errorMiddleware.js";
import ApiError from "./utils/ApiError.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB on serverless execution
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/onboarding", onboardingRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/dsa", dsaRoutes);
app.use("/api/v1/integrations", integrationRoutes);
app.use("/api/v1/ai/dsa", dsaAIRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/company-ai", companyAIRoutes);
app.use("/api/v1/copilot", copilotRoutes);

// Route Not Found
app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});

// Global Error Handler
app.use(errorHandler);

export default app;