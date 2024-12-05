"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const error_1 = require("../errors/error");
class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(dto, tokens) {
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: dto.password,
                    role: dto.role || "CLIENT",
                    credits: 100,
                    token: tokens.refreshToken,
                }
            });
            return user;
        }
        catch (error) {
            throw new error_1.ApiError("Failed to create user", 500);
        }
    }
    async updateUser(email, dto) {
        try {
            const user = await this.prisma.user.update({
                where: {
                    email
                },
                data: {
                    ...dto
                }
            });
            return user;
        }
        catch (error) {
            throw new error_1.ApiError("Failed to update user", 500);
        }
    }
    async pushResponse(email, response) {
        try {
            const user = await this.prisma.user.update({
                where: {
                    email
                },
                data: {
                    responses: {
                        push: response
                    }
                }
            });
            return user;
        }
        catch (error) {
            throw new error_1.ApiError("Failed to push response", 500);
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email
                }
            });
            return user;
        }
        catch (error) {
            throw new error_1.ApiError("Failed to get user", 500);
        }
    }
    async getAllUsers() {
        return await this.prisma.user.findMany();
    }
}
exports.UserRepository = UserRepository;
