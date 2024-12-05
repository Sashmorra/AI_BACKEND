"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const error_1 = require("../errors/error");
const ai_service_1 = require("../services/ai.service");
const aiService = new ai_service_1.AiService();
class AiController {
    async generate(req, res, next) {
        try {
            const user = res.locals.user;
            const { email } = user;
            const { modelId, promt } = req.body;
            if (!modelId || !promt) {
                throw (0, error_1.BadRequest)("ModelId and promt are required");
            }
            const answer = await aiService.generate(modelId, promt, email);
            res.json(answer);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AiController = AiController;
