import mongoose from "mongoose";

const StravaActivitySchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true }, // ✅ must be here
    name: String,
    distance: Number,
    moving_time: Number,
    start_date: String,
    type: String,
  },
  {
    collection: "strava_raw_activities",
    timestamps: true,
  },
);

export const StravaActivity =
  mongoose.models.StravaActivity ||
  mongoose.model("StravaActivity", StravaActivitySchema);
