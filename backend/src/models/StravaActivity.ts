import mongoose from "mongoose";

const StravaActivitySchema = new mongoose.Schema({}, {strict: false}); 

export const StravaActivity = mongoose.models.StravaActivity || mongoose.model("StravaActivity", StravaActivitySchema); 