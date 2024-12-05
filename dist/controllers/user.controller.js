"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const client_1 = require("@prisma/client");
const user_repository_1 = require("../repositories/user.repository");
const admin_1 = require("../helpers/admin");
const prisma = new client_1.PrismaClient();
const userRepository = new user_repository_1.UserRepository(prisma);
class UserController {
    async getAll(req, res, next) {
        try {
            const user_data = res.locals.user;
            (0, admin_1.isAdmin)(user_data.role);
            const users = await userRepository.getAllUsers();
            res.json(users);
        }
        catch (error) {
            next(error);
        }
    }
    async updateUserBalance(req, res, next) {
        try {
            const user_data = res.locals.user;
            (0, admin_1.isAdmin)(user_data.role);
            const { email, credits } = req.body;
            const user = await userRepository.updateUser(email, { credits: credits });
            res.json(user);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
