import type { Handler } from "@netlify/functions";
import { connectToDatabase } from "../../utils/db.js";

export const handler: Handler = async () => {
    try {
      await connectToDatabase();
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "✅ Connected to MongoDB!" }),
      };
    } catch (err) {
      console.error("MongoDB connection error:", err); // 👈 Add this
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "❌ DB connection failed" }),
      };
    }
  };
  
