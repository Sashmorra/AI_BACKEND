"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class TokenService {
    constructor() { }
    async generateTokens(payload) {
        const accessToken = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_ACCESS_SECRET || 'secret', { expiresIn: '15d' });
        const refreshToken = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_REFRESH_SECRET || 'secret', { expiresIn: '30d' });
        return { accessToken, refreshToken };
    }
    async validateRefreshToken(token) {
        try {
            const payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_REFRESH_SECRET || 'secret');
            return payload;
        }
        catch (_a) {
            return null;
        }
    }
    async validateAccessToken(token) {
        try {
            const payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_ACCESS_SECRET || 'secret');
            return payload;
        }
        catch (_a) {
            return null;
        }
    }
}
exports.TokenService = TokenService;
