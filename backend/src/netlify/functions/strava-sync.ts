import type { Handler } from "@netlify/functions";
import { fetchStravaActivities } from "@clients/strava";
import { connectToDatabase } from "@utils/db";
import { StravaActivity } from "@models/StravaActivity";

export const handler: Handler = async () => {
  try {
    const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN;
    if (!STRAVA_ACCESS_TOKEN) throw new Error("Missing STRAVA_ACCESS_TOKEN");

    await connectToDatabase();
    const activity = await fetchStravaActivities(STRAVA_ACCESS_TOKEN);

    await StravaActivity.updateOne(
        { id: activity[0].id },
        { $set: activity[0] },
        { upsert: true }
        );
      

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Saved ${activity.length} Strava activities.` }),
    };
  } catch (err: any) {
    console.error("Strava sync error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
