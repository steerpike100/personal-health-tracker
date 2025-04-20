import type { Handler } from "@netlify/functions";
import { connectToDatabase } from "@utils/db";
import {model, Schema} from "mongoose";

const StravaActivitySchema = new Schema({}, {strict: false});
const StravaActivity = model("StravaActivity", StravaActivitySchema, "strava_raw_activities");

export const handler: Handler = async () => {
    try{
        await connectToDatabase();

        const activities = await StravaActivity.find({}).sort({start_date:-1}).limit(10).lean();

        const trimmed = activities.map((act: any) => ({
            id: act.id,
            name: act.name,
            type: act.type,
            distance_km: (act.distance / 1000).toFixed(2),
            moving_time_min: Math.round(act.moving_time / 60),
            start_date: act.start_date,
          }));

          return {
            statusCode: 200,
            body: JSON.stringify(trimmed),
          };
        }catch(err:any){
            console.error("Failed to fetch activities:", err);      
            return {
                statusCode: 500,
                body: JSON.stringify({ error: err.message }),
            };
        }
    }