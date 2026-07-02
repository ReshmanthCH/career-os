import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import ApiError from "./utils/ApiError.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
// Route Not Found
app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});

// Global Error Handler
app.use(errorHandler);

export default app;