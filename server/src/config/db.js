import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/careeros";
    const connection = await mongoose.connect(mongoUri);
    isConnected = true;
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
  }
};

export default connectDB;