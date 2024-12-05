"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelRepository = void 0;
const error_1 = require("../errors/error");
class ModelRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addModel(modelId, chatId, cost) {
        try {
            const model = await this.prisma.aiModel.create({
                data: {
                    id: modelId,
                    chatId: chatId,
                    costPerToken: cost,
                }
            });
            return model;
        }
        catch (error) {
            throw new error_1.ApiError(error.message || "Failed to create model", 500);
        }
    }
    async getModel(id) {
        const model = await this.prisma.aiModel.findUnique({
            where: {
                id
            }
        });
        return model;
    }
    ;
    async updateModel(id, dto) {
        const model = await this.prisma.aiModel.update({
            where: { id },
            data: {
                ...dto
            }
        });
    }
    async getAllModels() {
        const models = await this.prisma.aiModel.findMany();
        return models;
    }
}
exports.ModelRepository = ModelRepository;
