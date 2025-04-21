"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StravaActivity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const StravaActivitySchema = new mongoose_1.default.Schema({}, { strict: false });
exports.StravaActivity = mongoose_1.default.models.StravaActivity || mongoose_1.default.model("StravaActivity", StravaActivitySchema, "strava_raw_activities");
