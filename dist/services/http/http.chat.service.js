"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpChatService = void 0;
const error_1 = require("../../errors/error");
class HttpChatService {
    constructor(axios) {
        this.axios = axios;
    }
    async createChat(modelId, name) {
        var _a, _b, _c, _d;
        try {
            const res = await this.axios.post("/chat", {
                modelId: modelId,
                name: name
            });
            return res.data;
        }
        catch (error) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                throw new error_1.ApiError("Model not found on our AI API", 404);
            }
            throw new error_1.ApiError(((_c = (_b = error.resposne) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || "Falied to generate", ((_d = error.response) === null || _d === void 0 ? void 0 : _d.status) || 500);
        }
    }
    async isActiveChat(chatId) {
        try {
            const res = await this.axios.get(`/chat/${chatId}`);
            if (res.status !== 200) {
                return false;
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.HttpChatService = HttpChatService;
