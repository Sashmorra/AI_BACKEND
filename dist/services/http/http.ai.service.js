"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiHttpService = void 0;
const error_1 = require("../../errors/error");
class AiHttpService {
    constructor(axiosInstance) {
        this.axiosInstance = axiosInstance;
    }
    async generate(chatId, promt) {
        try {
            const response = await this.axiosInstance.post("/message/send", { chatId, message: promt });
            return response.data.id;
        }
        catch (error) {
            throw new error_1.ApiError("Faliead to generate", 500);
        }
    }
    async getMessage(messageId) {
        const response = await this.axiosInstance.get(`/message/${messageId}`);
        if (response.status !== 200) {
            throw new error_1.ApiError("Message not found", 404);
        }
        return response.data;
    }
}
exports.AiHttpService = AiHttpService;
