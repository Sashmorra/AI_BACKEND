"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authController = new auth_controller_1.AuthController();
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
/**
 * @swagger
 * /api/auth/registration:
 *   post:
 *     summary: Регистрация пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 example: "CLIENT"
 *     responses:
 *       200:
 *         description: Успешная регистрация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "access-token-example"
 *                 refreshToken:
 *                   type: string
 *                   example: "refresh-token-example"
 */
authRouter.post('/registration', authController.registration);
/**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Авторизация пользователя
   *     description: Выполняет вход пользователя по email и паролю
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 example: "user@example.com"
   *               password:
   *                 type: string
   *                 format: password
   *                 example: "password123"
   *             required:
   *               - email
   *               - password
   *     responses:
   *       200:
   *         description: Успешная авторизация.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   *                 refreshToken:
   *                   type: string
   */
authRouter.post('/login', authController.login);
/**
   * @swagger
   * /api/auth/refresh:
   *   get:
   *     summary: Обновление токенов
   *     description: Обновляет accessToken и refreshToken, используя существующий refreshToken.
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: Успешное обновление токенов.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   *                 refreshToken:
   *                   type: string
   */
authRouter.get('/refresh', authController.refresh);
