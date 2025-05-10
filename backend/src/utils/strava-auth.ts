import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const STRAVA_TOKEN_PATH = path.resolve(process.cwd(), '.strava-token.json');


interface StravaTokenData {
  access_token: string;
  refresh_token: string;
  expires_at: number; // UNIX timestamp
}

export async function getValidStravaAccessToken(): Promise<string> {
  const tokenData = await loadTokenData();

  const now = Math.floor(Date.now() / 1000);
  if (tokenData.expires_at > now + 60) {
    return tokenData.access_token;
  }

  const newToken = await refreshAccessToken(tokenData.refresh_token);
  await saveTokenData(newToken);
  return newToken.access_token;
}

async function refreshAccessToken(refreshToken: string): Promise<StravaTokenData> {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;

  const response = await fetch('https://www.strava.com/api/v3/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId!,
      client_secret: clientSecret!,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to refresh token: ${response.status} ${text}`);
  }

  const json = await response.json() as {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  };
  
  return {
    access_token: json.access_token,
    refresh_token: json.refresh_token,
    expires_at: json.expires_at,
  };
}

async function loadTokenData(): Promise<StravaTokenData> {
  const data = await fs.readFile(STRAVA_TOKEN_PATH, 'utf-8');
  return JSON.parse(data);
}

async function saveTokenData(token: StravaTokenData): Promise<void> {
  await fs.writeFile(STRAVA_TOKEN_PATH, JSON.stringify(token, null, 2), 'utf-8');
}
