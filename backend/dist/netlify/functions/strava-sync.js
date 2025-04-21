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
const handler = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN;
        if (!STRAVA_ACCESS_TOKEN)
            throw new Error("Missing STRAVA_ACCESS_TOKEN");
        yield (0, db_1.connectToDatabase)();
        const activity = yield (0, strava_1.fetchStravaActivities)(STRAVA_ACCESS_TOKEN);
        yield StravaActivity_1.StravaActivity.updateOne({ id: activity[0].id }, { $set: activity[0] }, { upsert: true });
        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Saved ${activity.length} Strava activities.` }),
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
