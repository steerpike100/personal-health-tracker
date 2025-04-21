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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStravaActivities = fetchStravaActivities;
// backend/src/lib/clients/strava.ts
const node_fetch_1 = __importDefault(require("node-fetch"));
const STRAVA_API_BASE = "https://www.strava.com/api/v3";
function fetchStravaActivities(accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, node_fetch_1.default)(`${STRAVA_API_BASE}/athlete/activities`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            const errorText = yield response.text();
            throw new Error(`Strava API error: ${response.status} ${errorText}`);
        }
        return yield response.json();
    });
}
