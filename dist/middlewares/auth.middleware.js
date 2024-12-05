"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const error_1 = require("../errors/error");
const token_service_1 = require("../services/token.service");
const tokenService = new token_service_1.TokenService();
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw (0, error_1.Unauthorized)();
        }
        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            throw (0, error_1.Unauthorized)();
        }
        const payload = await tokenService.validateAccessToken(accessToken);
        if (!payload) {
            throw (0, error_1.Unauthorized)();
        }
        res.locals.user = payload;
        next();
    }
    catch (error) {
        next((0, error_1.Unauthorized)());
    }
};
exports.authMiddleware = authMiddleware;
