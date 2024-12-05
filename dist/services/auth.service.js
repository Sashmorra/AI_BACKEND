"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const error_1 = require("../errors/error");
const user_repository_1 = require("../repositories/user.repository");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_service_1 = require("./token.service");
const prisma = new client_1.PrismaClient();
const userRepository = new user_repository_1.UserRepository(prisma);
const tokenService = new token_service_1.TokenService();
class AuthService {
    async registration(dto) {
        const candidate = await userRepository.getUserByEmail(dto.email);
        if (candidate) {
            throw (0, error_1.BadRequest)("User with this email already exists");
        }
        const hashPassword = await bcrypt_1.default.hash(dto.password, process.env.SALT || 10);
        const tokens = await tokenService.generateTokens({ email: dto.email, role: dto.role || "CLIENT" });
        await userRepository.createUser({ email: dto.email, password: hashPassword, role: dto.role }, tokens);
        return tokens;
    }
    async login(dto) {
        const user = await userRepository.getUserByEmail(dto.email);
        if (!user) {
            throw (0, error_1.BadRequest)("User with this email not found");
        }
        const isPassEquals = bcrypt_1.default.compareSync(dto.password, user.password);
        if (!isPassEquals) {
            throw (0, error_1.BadRequest)("Wrong password");
        }
        const tokens = await tokenService.generateTokens({ email: user.email, role: user.role });
        await userRepository.updateUser(user.email, { token: tokens.refreshToken });
        return tokens;
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw (0, error_1.BadRequest)("Token is required");
        }
        const userData = await tokenService.validateRefreshToken(refreshToken);
        if (!userData) {
            throw (0, error_1.Unauthorized)();
        }
        const user = await userRepository.getUserByEmail(userData.email);
        if (!user) {
            throw (0, error_1.Unauthorized)();
        }
        const tokens = await tokenService.generateTokens({ email: userData.email, role: userData.role });
        await userRepository.updateUser(userData.email, { token: tokens.refreshToken });
        return tokens;
    }
}
exports.AuthService = AuthService;
