import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Company from "./src/models/Company.js";

async function testCompaniesDB() {
  console.log("Checking MongoDB Companies Collection...");
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/careeros";
  await mongoose.connect(mongoUri);

  const count = await Company.countDocuments();
  console.log(`Total Companies in DB: ${count}`);

  if (count > 0) {
    const sample = await Company.find().limit(5);
    console.log("Sample companies:", sample.map((c) => ({ id: c._id, name: c.companyName, slug: c.slug })));
  }

  process.exit(0);
}

testCompaniesDB();
