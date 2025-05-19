"use strict";
// backend/src/utils/strava-auth.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidStravaAccessToken = getValidStravaAccessToken;
function getValidStravaAccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = process.env.STRAVA_REFRESH_TOKEN;
        const clientId = process.env.STRAVA_CLIENT_ID;
        const clientSecret = process.env.STRAVA_CLIENT_SECRET;
        if (!refreshToken || !clientId || !clientSecret) {
            throw new Error("❌ Missing Strava credentials (client ID, secret, or refresh token)");
        }
        const res = yield fetch("https://www.strava.com/api/v3/oauth/token", {
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
            const errorText = yield res.text();
            throw new Error(`❌ Failed to refresh Strava token: ${res.status} - ${errorText}`);
        }
        const data = yield res.json();
        if (!data.access_token) {
            throw new Error("❌ No access_token returned from Strava");
        }
        console.log("🔐 Refreshed Strava access token");
        return data.access_token;
    });
}
