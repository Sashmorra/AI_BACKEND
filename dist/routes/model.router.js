"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelRouter = void 0;
const express_1 = require("express");
const model_controller_1 = require("../controllers/model.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const modelRouter = (0, express_1.Router)();
exports.modelRouter = modelRouter;
const modelController = new model_controller_1.ModelController();
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
modelRouter.post("/add", modelController.addModel);
