"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const http_ai_service_1 = require("./http/http.ai.service");
const http_config_1 = require("../config/http.config");
const http_chat_service_1 = require("./http/http.chat.service");
const model_service_1 = require("./model.service");
const error_1 = require("../errors/error");
const user_repository_1 = require("../repositories/user.repository");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const modelService = new model_service_1.ModelService();
const userService = new user_repository_1.UserRepository(prisma);
const aiHttpService = new http_ai_service_1.AiHttpService(http_config_1.axiosInstance);
const chatHttpService = new http_chat_service_1.HttpChatService(http_config_1.axiosInstance);
class AiService {
    async generate(modelId, promt, userEmail) {
        const userBalance = await userService.getUserByEmail(userEmail);
        if (userBalance.credits < 0) {
            throw new error_1.ApiError("Not enough balance", 400);
        }
        const model = await modelService.getModel(modelId);
        if (!model) {
            throw (0, error_1.BadRequest)("Model not found");
        }
        let chatId = model.chatId;
        const isActive = await chatHttpService.isActiveChat(chatId);
        if (!isActive) {
            const chatData = await chatHttpService.createChat(model.id, model.id);
            chatId = chatData.id;
            await modelService.updateModel(model.id, { chatId: chatData.id });
        }
        const messageId = await aiHttpService.generate(chatId, promt);
        let message;
        while (true) {
            const statusMessage = await aiHttpService.getMessage(messageId);
            if (statusMessage.status === "DONE") {
                message = statusMessage;
                break;
            }
            else if (statusMessage.status === "FAILED") {
                throw new Error("Message generation failed");
            }
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
        const { content, tokens } = message;
        const messageCost = tokens * model.costPerToken;
        await userService.updateUser(userEmail, { credits: userBalance.credits - messageCost });
        await userService.pushResponse(userEmail, content);
        return { content, messageCost };
    }
}
exports.AiService = AiService;
