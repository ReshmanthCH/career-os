import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "./src/models/User.js";
import Feedback from "./src/models/Feedback.js";
import { submitFeedback } from "./src/controllers/feedbackController.js";
import { getAdminStats, getAdminFeedbacks } from "./src/controllers/adminController.js";

async function runFeedbackSuite() {
  console.log("==================================================");
  console.log("       DEVRYN FEEDBACK FEATURE DIAGNOSTIC TEST    ");
  console.log("==================================================\n");

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log(`✅ TEST ${totalTests}: ${message}`);
      passedTests++;
    } else {
      console.error(`❌ TEST ${totalTests} FAILED: ${message}`);
    }
  }

  // 1. Connect MongoDB
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/careeros";
  await mongoose.connect(mongoUri);
  assert(mongoose.connection.readyState === 1, "MongoDB Database connected");

  // 2. Find student user
  const user = await User.findOne({ role: { $ne: "admin" } });
  assert(user !== null, "Found test student user in database");

  // 3. Test submitFeedback Controller
  console.log("\n--- Testing submitFeedback Controller ---");
  let createdFeedbackId = null;

  const reqSubmit = {
    user: { _id: user._id },
    body: {
      category: "Feature Request",
      rating: 5,
      subject: "Diagnostic Verification Test Feedback",
      message: "This is an automated diagnostic test feedback submission verifying the Devryn feedback loop.",
    },
  };

  const resSubmit = {
    status: (code) => ({
      json: (data) => {
        if (data.success && data.feedback) {
          createdFeedbackId = data.feedback._id;
        }
      },
    }),
  };

  await submitFeedback(reqSubmit, resSubmit, (err) => console.error(err));
  assert(createdFeedbackId !== null, "submitFeedback saved new feedback entry to MongoDB");

  // 4. Test getAdminFeedbacks Controller
  console.log("\n--- Testing getAdminFeedbacks Controller ---");
  let adminFeedbacksList = null;

  const reqAdmin = { headers: {} };
  const resAdmin = {
    status: (code) => ({
      json: (data) => {
        if (data.success) {
          adminFeedbacksList = data.feedbacks;
        }
      },
    }),
  };

  await getAdminFeedbacks(reqAdmin, resAdmin, (err) => console.error(err));
  assert(
    Array.isArray(adminFeedbacksList) && adminFeedbacksList.length > 0,
    `getAdminFeedbacks returned populated feedback records (Total entries: ${adminFeedbacksList?.length})`
  );

  const foundTestFeedback = adminFeedbacksList?.find(
    (f) => f._id.toString() === createdFeedbackId.toString()
  );

  assert(
    foundTestFeedback && foundTestFeedback.user?.name !== undefined,
    `Admin Feedback entry correctly populated student user details (Name: ${foundTestFeedback?.user?.name})`
  );

  // 5. Cleanup Test Feedback Entry
  if (createdFeedbackId) {
    await Feedback.findByIdAndDelete(createdFeedbackId);
  }

  console.log("\n==================================================");
  console.log(`  PASSED ${passedTests} / ${totalTests} DIAGNOSTIC CHECKS ✓ `);
  console.log("==================================================");

  process.exit(0);
}

runFeedbackSuite();
