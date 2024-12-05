import { Router } from "express";
import { AiController } from "../controllers/ai.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const aiController = new AiController();
const aiRouter = Router();


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
aiRouter.post("/generate",authMiddleware,  aiController.generate);


export { aiRouter };
