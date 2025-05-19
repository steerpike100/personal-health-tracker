// backend/src/utils/strava-auth.ts

export async function getValidStravaAccessToken(): Promise<string> {
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN;
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;

  if (!refreshToken || !clientId || !clientSecret) {
    throw new Error("❌ Missing Strava credentials (client ID, secret, or refresh token)");
  }

  const res = await fetch("https://www.strava.com/api/v3/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`❌ Failed to refresh Strava token: ${res.status} - ${errorText}`);
  }

  const data = await res.json();

  if (!data.access_token) {
    throw new Error("❌ No access_token returned from Strava");
  }

  console.log("🔐 Refreshed Strava access token");

  return data.access_token;
}
