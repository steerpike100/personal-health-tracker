import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config(); 


const MONGODB_URI = process.env.MONGODB_URI || "";

let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase() {
  if (cachedConnection) return cachedConnection;

  try {
    cachedConnection = await mongoose.connect(MONGODB_URI, {
      dbName: "health-dashboard",
    });
    console.log("✅ MongoDB connected");
    console.log("Connecting to MongoDB with URI:", MONGODB_URI);

    return cachedConnection;
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    throw error;    
  }
}
