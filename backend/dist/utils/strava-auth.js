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
exports.getValidStravaAccessToken = getValidStravaAccessToken;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const STRAVA_TOKEN_PATH = path_1.default.resolve(process.cwd(), '.strava-token.json');
function getValidStravaAccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenData = yield loadTokenData();
        const now = Math.floor(Date.now() / 1000);
        if (tokenData.expires_at > now + 60) {
            return tokenData.access_token;
        }
        const newToken = yield refreshAccessToken(tokenData.refresh_token);
        yield saveTokenData(newToken);
        return newToken.access_token;
    });
}
function refreshAccessToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientId = process.env.STRAVA_CLIENT_ID;
        const clientSecret = process.env.STRAVA_CLIENT_SECRET;
        const response = yield (0, node_fetch_1.default)('https://www.strava.com/api/v3/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            }),
        });
        if (!response.ok) {
            const text = yield response.text();
            throw new Error(`Failed to refresh token: ${response.status} ${text}`);
        }
        const json = yield response.json();
        return {
            access_token: json.access_token,
            refresh_token: json.refresh_token,
            expires_at: json.expires_at,
        };
    });
}
function loadTokenData() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield promises_1.default.readFile(STRAVA_TOKEN_PATH, 'utf-8');
        return JSON.parse(data);
    });
}
function saveTokenData(token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield promises_1.default.writeFile(STRAVA_TOKEN_PATH, JSON.stringify(token, null, 2), 'utf-8');
    });
}
