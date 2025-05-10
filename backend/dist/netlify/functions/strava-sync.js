"use strict";
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
exports.handler = void 0;
const strava_1 = require("@clients/strava");
const db_1 = require("@utils/db");
const StravaActivity_1 = require("@models/StravaActivity");
const strava_auth_1 = require("@utils/strava-auth");
const handler = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN;
        if (!STRAVA_ACCESS_TOKEN)
            throw new Error("Missing STRAVA_ACCESS_TOKEN");
        yield (0, db_1.connectToDatabase)();
        yield StravaActivity_1.StravaActivity.collection.createIndex({ id: 1 }, { unique: true });
        const accessToken = yield (0, strava_auth_1.getValidStravaAccessToken)();
        const activities = yield (0, strava_1.fetchStravaActivities)(accessToken);
        console.log('Fetched', activities.length, 'activities from Strava');
        console.log('First activity object keys:', Object.keys(activities[0]));
        console.log('First activity raw:', activities[0]);
        let upserted = 0;
        for (const activity of activities) {
            if (!activity.id) {
                console.warn('⚠️ Skipping activity without an ID:', activity);
                continue;
            }
            console.log(`✅ Processing activity ID: ${activity.id} - ${activity.name}`);
            const result = yield StravaActivity_1.StravaActivity.updateOne({ id: activity.id }, { $set: activity }, { upsert: true });
            console.log(`Matched: ${result.matchedCount}, Upserted: ${result.upsertedCount}`);
            upserted += (_a = result.upsertedCount) !== null && _a !== void 0 ? _a : 0;
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Synced ${activities.length} activities. Inserted ${upserted}.` }),
        };
    }
    catch (err) {
        console.error("Strava sync error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
});
exports.handler = handler;
