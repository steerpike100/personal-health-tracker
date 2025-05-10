// backend/src/lib/clients/strava.ts
import fetch from "node-fetch";

const STRAVA_API_BASE = "https://www.strava.com/api/v3";

interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  type: string;
  start_date: string;
}

export async function fetchStravaActivities(accessToken: string): Promise<StravaActivity[]> {
  const response = await fetch(`${STRAVA_API_BASE}/athlete/activities`, {
  
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Strava API error: ${response.status} ${errorText}`);
  }

  return await response.json() as StravaActivity[];
}
