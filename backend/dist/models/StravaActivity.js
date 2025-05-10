"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StravaActivity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const StravaActivitySchema = new mongoose_1.default.Schema({
    id: { type: Number, required: true, unique: true }, // ✅ must be here
    name: String,
    distance: Number,
    moving_time: Number,
    start_date: String,
    type: String,
}, {
    collection: 'strava_raw_activities',
    timestamps: true,
});
exports.StravaActivity = mongoose_1.default.models.StravaActivity
    || mongoose_1.default.model('StravaActivity', StravaActivitySchema);
