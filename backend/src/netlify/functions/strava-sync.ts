import type { Handler } from "@netlify/functions";
import { fetchStravaActivities } from "@clients/strava";
import { connectToDatabase } from "@utils/db";
import { StravaActivity } from "@models/StravaActivity";
import { getValidStravaAccessToken } from "@utils/strava-auth";

export const handler: Handler = async () => {
  try {
    const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN;
    if (!STRAVA_ACCESS_TOKEN) throw new Error("Missing STRAVA_ACCESS_TOKEN");

    await connectToDatabase();
    await StravaActivity.collection.createIndex({ id: 1 }, { unique: true });

    const accessToken = await getValidStravaAccessToken();
    const activities = await fetchStravaActivities(accessToken);

    console.log("Fetched", activities.length, "activities from Strava");
    console.log("First activity object keys:", Object.keys(activities[0]));
    console.log("First activity raw:", activities[0]);

    let upserted = 0;

    for (const activity of activities) {
      if (!activity.id) {
        console.warn("⚠️ Skipping activity without an ID:", activity);
        continue;
      }

      console.log(
        `✅ Processing activity ID: ${activity.id} - ${activity.name}`,
      );

      const result = await StravaActivity.updateOne(
        { id: activity.id },
        { $set: activity },
        { upsert: true },
      );

      console.log(
        `Matched: ${result.matchedCount}, Upserted: ${result.upsertedCount}`,
      );
      upserted += result.upsertedCount ?? 0;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Synced ${activities.length} activities. Inserted ${upserted}.`,
      }),
    };
  } catch (err: any) {
    console.error("Strava sync error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
