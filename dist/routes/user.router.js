"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
const userController = new user_controller_1.UserController();
/**
 * @swagger
 * /api/user/all:
 *   get:
 *     summary: Получить список всех пользователей.
 *     description: Возвращает список всех зарегистрированных пользователей (только для администраторов).
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешное получение списка пользователей.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Уникальный идентификатор пользователя.
 *                   email:
 *                     type: string
 *                     description: Электронная почта пользователя.
 *                   password:
 *                      type: string
 *                      description: Пароль пользователя.
 *                   credits:
 *                     type: number
 *                     description: Баланс пользователя.
 *                   role:
 *                     type: string
 *                     description: Роль пользователя (например, "user", "admin").
 *                   token:
 *                      type: string
 *                      description: Токен пользователя.
 *                   responses:
 *                      type: array
 *                      description: Список ответов от моделей пользователя.
 *
 *
 */
userRouter.get('/all', auth_middleware_1.authMiddleware, userController.getAll);
/**
 * @swagger
 * /api/user/balance:
 *   patch:
 *     summary: Обновить баланс пользователя.
 *     description: Обновляет баланс пользователя. Доступно только администраторам.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []  # Требуется авторизация через Bearer Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Электронная почта пользователя, чей баланс нужно обновить.
 *               credits:
 *                 type: integer
 *                 description: Новый баланс пользователя.
 *     responses:
 *       200:
 *         description: Баланс пользователя успешно обновлен.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 credits:
 *                   type: integer
 */
userRouter.patch('/balance', auth_middleware_1.authMiddleware, userController.updateUserBalance);
