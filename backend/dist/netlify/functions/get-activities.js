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
const db_1 = require("@utils/db");
const mongoose_1 = require("mongoose");
const StravaActivitySchema = new mongoose_1.Schema({}, { strict: false });
const StravaActivity = (0, mongoose_1.model)("StravaActivity", StravaActivitySchema, "strava_raw_activities");
const handler = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectToDatabase)();
        const activities = yield StravaActivity.find({})
            .sort({ start_date: -1 })
            .limit(100)
            .lean();
        console.log("🔢 Total fetched:", activities.length);
        activities.forEach((a) => console.log(`${a.start_date} | ${a.type} | ${a.name}`));
        const trimmed = activities.map((act) => ({
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
    }
    catch (err) {
        console.error("Failed to fetch activities:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
});
exports.handler = handler;
