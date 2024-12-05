"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelController = void 0;
const error_1 = require("../errors/error");
const model_service_1 = require("../services/model.service");
const modelService = new model_service_1.ModelService();
class ModelController {
    async addModel(req, res, next) {
        try {
            const { name, cost } = req.body;
            if (!name || !cost) {
                throw (0, error_1.BadRequest)("Name and cost are required");
            }
            const chat = await modelService.addModel(name, cost);
            res.json(chat);
        }
        catch (error) {
            next(error);
        }
    }
    async getModels(req, res, next) {
        try {
            const models = await modelService.getAllModels();
            res.json(models);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ModelController = ModelController;
