"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configDb = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const configDb = async () => {
    if (await prisma.aiModel.findUnique({ where: { id: "gpt" } })) {
        return;
    }
    await prisma.aiModel.create({
        data: {
            id: "gpt",
            chatId: "98944187-9870-4bdd-96d8-4c51ddb3409e",
            costPerToken: 0.05
        }
    });
};
exports.configDb = configDb;
