import fetch from 'node-fetch';
import * as fs from 'fs/promises';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
  console.error(
    'Missing STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, or STRAVA_REFRESH_TOKEN in .env'
  );
  process.exit(1);
}

const STRAVA_TOKEN_PATH = path.resolve(process.cwd(), '.strava-token.json');

async function refreshAndSaveToken() {
  console.log('🔄 Refreshing token from Strava...');

  const response = await fetch('https://www.strava.com/api/v3/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: STRAVA_CLIENT_ID as string,
      client_secret: STRAVA_CLIENT_SECRET as string,
      grant_type: 'refresh_token',
      refresh_token: STRAVA_REFRESH_TOKEN as string,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to refresh token: ${response.status} ${error}`);
  }

  const json = (await response.json()) as {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  };

  const tokenData = {
    access_token: json.access_token,
    refresh_token: json.refresh_token,
    expires_at: json.expires_at,
  };

  await fs.writeFile(STRAVA_TOKEN_PATH, JSON.stringify(tokenData, null, 2));
  console.log(`✅ Token saved to ${STRAVA_TOKEN_PATH}`);
}

refreshAndSaveToken().catch(err => {
  console.error('❌ Failed to initialize token:', err.message);
  process.exit(1);
});
