"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelService = void 0;
const client_1 = require("@prisma/client");
const model_repository_1 = require("../repositories/model.repository");
const http_config_1 = require("../config/http.config");
const http_chat_service_1 = require("./http/http.chat.service");
const error_1 = require("../errors/error");
const prisma = new client_1.PrismaClient();
const modelRepository = new model_repository_1.ModelRepository(prisma);
const httpChatService = new http_chat_service_1.HttpChatService(http_config_1.axiosInstance);
class ModelService {
    constructor() { }
    async addModel(modelId, costPerToken) {
        const model = await modelRepository.getModel(modelId);
        if (model) {
            throw (0, error_1.BadRequest)("Model already exists");
        }
        const chatData = await httpChatService.createChat(modelId, modelId);
        const newModel = await modelRepository.addModel(modelId, chatData.id, costPerToken);
        return newModel;
    }
    async getAllModels() {
        const models = await modelRepository.getAllModels();
        return models;
    }
    async getModel(id) {
        const model = await modelRepository.getModel(id);
        return model;
    }
    async updateModel(id, dto) {
        await modelRepository.updateModel(id, dto);
        return;
    }
}
exports.ModelService = ModelService;
