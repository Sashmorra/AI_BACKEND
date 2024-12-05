"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiRouter = void 0;
const express_1 = require("express");
const ai_controller_1 = require("../controllers/ai.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const aiController = new ai_controller_1.AiController();
const aiRouter = (0, express_1.Router)();
exports.aiRouter = aiRouter;
/**
 * @swagger
 * /api/ai/generate:
 *   post:
 *     summary: Запрос к нейросети.
 *     description: Отправка промпта для генерации ответа от модели.
 *     security:
 *       - bearerAuth: []
 *     tags: [Ai]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modelId:
 *                 type: string
 *                 description: Идентификатор модели для генерации.
 *               promt:
 *                 type: string
 *                 description: Текстовое сообщение для модели.
 *     responses:
 *       200:
 *         description: Успешная генерация ответа.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *                   description: Сгенерированный текст.
 *                 messageCost:
 *                   type: number
 *                   description: Стоимость генерации в валюте приложения.
   */
aiRouter.post("/generate", auth_middleware_1.authMiddleware, aiController.generate);
