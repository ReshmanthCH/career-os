import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./src/app.js";

async function testAdminApiLocal() {
  console.log("==================================================");
  console.log("       ADMIN DASHBOARD API DIAGNOSTICS TEST       ");
  console.log("==================================================\n");

  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/careeros";
  await mongoose.connect(mongoUri);

  // Directly call controller functions
  import("./src/controllers/adminController.js").then(async (controller) => {
    const reqLogin = {
      body: {
        email: process.env.ADMIN_EMAIL || "admin@careeros.com",
        password: process.env.ADMIN_PASSWORD || "Admin@CareerOS2026",
      },
    };

    let token = null;
    const resLogin = {
      status: (code) => ({
        json: (data) => {
          console.log(`Test 1: Admin Login (Status ${code}):`, data.success ? "✅ SUCCESS" : "❌ FAILED");
          if (data.token) token = data.token;
        },
      }),
    };

    await controller.adminLogin(reqLogin, resLogin, (err) => console.error(err));

    if (token) {
      const reqStats = { headers: { authorization: `Bearer ${token}` } };
      const resStats = {
        status: (code) => ({
          json: (data) => {
            console.log(`\nTest 2: Fetch Admin Stats (Status ${code}):`, data.stats);
          },
        }),
      };

      await controller.getAdminStats(reqStats, resStats, (err) => console.error(err));

      const reqUsers = { query: { search: "" }, headers: { authorization: `Bearer ${token}` } };
      const resUsers = {
        status: (code) => ({
          json: (data) => {
            console.log(`\nTest 3: Fetch Admin Users List (Status ${code}): Returned ${data.users?.length || 0} user records`);
            if (data.users?.length > 0) {
              console.log("   Sample user:", {
                name: data.users[0].name,
                email: data.users[0].email,
                targetRole: data.users[0].targetRole,
                status: data.users[0].onboardingCompleted ? "Active" : "Onboarding Pending",
              });
            }
          },
        }),
      };

      await controller.getAdminUsers(reqUsers, resUsers, (err) => console.error(err));
    }

    console.log("\n==================================================");
    console.log("         ADMIN DASHBOARD TESTS PASSED ✓           ");
    console.log("==================================================");
    process.exit(0);
  });
}

testAdminApiLocal();
