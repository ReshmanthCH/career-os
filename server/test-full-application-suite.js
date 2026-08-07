import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Company from "./src/models/Company.js";
import User from "./src/models/User.js";
import Profile from "./src/models/Profile.js";
import { getCompaniesList, getCompanyDetails } from "./src/services/companyService.js";
import { buildCompanyAIContext } from "./src/services/ai/companyContextBuilder.js";
import { fetchCodeChefData } from "./src/services/integrations/codechef/codechefService.js";
import { extractUrlsFromText } from "./src/utils/urlExtractor.js";
import { adminLogin, getAdminStats, getAdminUsers } from "./src/controllers/adminController.js";

async function runFullApplicationSuite() {
  console.log("==================================================");
  console.log("  CAREEROS FULL APPLICATION END-TO-END SUITE TEST ");
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

  // 1. Database Connection
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/careeros";
  await mongoose.connect(mongoUri);
  assert(mongoose.connection.readyState === 1, "MongoDB Database connected successfully");

  // 2. Company Database Count
  const totalCompanyCount = await Company.countDocuments();
  assert(totalCompanyCount >= 52, `Company database contains ${totalCompanyCount} real company records (Expected >= 52)`);

  // 3. Company Intelligence Filtering & Search
  const allCompanies = await getCompaniesList({}, null);
  assert(allCompanies.length >= 52, `getCompaniesList() returned ${allCompanies.length} companies`);

  const fintechCompanies = await getCompaniesList({ category: "FinTech / Payments" }, null);
  assert(fintechCompanies.length === 7, `FinTech Category Filter returned exactly 7 companies (Got ${fintechCompanies.length})`);

  const googleSearch = await getCompaniesList({ search: "Google" }, null);
  assert(googleSearch.length >= 1 && googleSearch[0].companyName === "Google", "Search for 'Google' returned Google profile");

  const companyDetails = await getCompanyDetails("google", null);
  assert(companyDetails && companyDetails.slug === "google", "Company details lookup by slug 'google' succeeded");

  // 4. CodeChef Scraper Test
  console.log("\n--- Testing CodeChef Direct Scraper Integration ---");
  const codechefData = await fetchCodeChefData("gennady.korotkevich");
  assert(
    codechefData && codechefData.currentRating >= 3000 && codechefData.stars === "7★",
    `CodeChef Scraper fetched Gennady Korotkevich profile (Rating: ${codechefData?.currentRating}, Stars: ${codechefData?.stars})`
  );

  // 5. Resume URL Extractor Test
  console.log("\n--- Testing Resume URL Extractor ---");
  const sampleResumeText = "John Doe SDE Resume. LinkedIn: https://linkedin.com/in/johndoe-dev GitHub: https://github.com/johndoe-repo";
  const extractedLinks = extractUrlsFromText(sampleResumeText);
  assert(
    extractedLinks.linkedin === "https://linkedin.com/in/johndoe-dev" &&
    extractedLinks.github === "https://github.com/johndoe-repo",
    "Resume URL Extractor correctly parsed LinkedIn and GitHub URLs from text"
  );

  // 6. Company AI Context & Readiness Engine Schema Mapping
  console.log("\n--- Testing Company AI Advisor & Schema Mapping ---");
  const user = await User.findOne();
  const company = await Company.findOne({ companyName: "Accenture" }) || await Company.findOne();

  if (user && company) {
    const aiContext = await buildCompanyAIContext(user._id, company._id);
    assert(aiContext && aiContext.targetCompany.companyName === company.companyName, "Company AI Context builder produced valid context");
  }

  // 7. Admin Dashboard APIs
  console.log("\n--- Testing Admin Portal APIs ---");
  const reqLogin = {
    body: {
      email: process.env.ADMIN_EMAIL || "admin@careeros.com",
      password: process.env.ADMIN_PASSWORD || "Admin@CareerOS2026",
    },
  };

  let adminToken = null;
  const resLogin = {
    status: (code) => ({
      json: (data) => {
        if (data.token) adminToken = data.token;
      },
    }),
  };

  await adminLogin(reqLogin, resLogin, (err) => console.error(err));
  assert(adminToken !== null, "Admin login API authenticated successfully and returned JWT token");

  if (adminToken) {
    const reqStats = { headers: { authorization: `Bearer ${adminToken}` } };
    let statsData = null;
    const resStats = {
      status: (code) => ({
        json: (data) => {
          statsData = data.stats;
        },
      }),
    };

    await getAdminStats(reqStats, resStats, (err) => console.error(err));
    assert(statsData && statsData.totalCompanies >= 52, `Admin Stats API returned live numbers (Total Companies: ${statsData?.totalCompanies}, Total Users: ${statsData?.totalUsers})`);
  }

  console.log("\n==================================================");
  console.log(`  PASSED ${passedTests} / ${totalTests} DIAGNOSTIC CHECKS ✓ `);
  console.log("==================================================");

  process.exit(0);
}

runFullApplicationSuite();
