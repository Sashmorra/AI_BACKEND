import { Router } from "express";
import { ModelController } from "../controllers/model.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const modelRouter = Router();
const modelController = new ModelController();

/**
 * @swagger
 * /api/model/all:
 *   get:
 *     summary: Получить список всех моделей.
 *     description: Возвращает список всех доступных моделей.
 *     tags: [Models]
 *     responses:
 *       200:
 *         description: Успешное получение списка моделей.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Уникальный идентификатор модели.
 *                   chatId:
 *                     type: string
 *                     description: Id чата на сторонем api сервисе.
 *                   costPerToken:
 *                     type: number
 *                     description: Стоимость генерации одного токена.
*/
modelRouter.get("/all", modelController.getModels);

/**
 * @swagger
 * /api/model/add:
 *   post:
 *     summary: Добавить новую модель.
 *     description: Добавляет новую модель в систему.
 *     tags: [Models]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "gpt"
 *                 description: Название модели и ее id на сторонем api сервисе.
 *               cost:
 *                 type: number
 *                 example: 0.002
 *                 description: Цена одного токена.
 *     responses:
 *       200:
 *         description: Модель успешно добавлена.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Уникальный идентификатор добавленной модели.
 *                 chatId:
 *                   type: string
 *                   description: Id чата на сторонем api сервисе.
 *                 costPerToken:
 *                   type: string
 *                   description: Стоимость генерации одного токена.
 */
modelRouter.post("/add", authMiddleware, modelController.addModel);



export { modelRouter };
