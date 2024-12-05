"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = require("./middlewares/error.middleware");
const auth_router_1 = require("./routes/auth.router");
const user_router_1 = require("./routes/user.router");
const ai_router_1 = require("./routes/ai.router");
const model_router_1 = require("./routes/model.router");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const db_config_1 = require("./config/db.config");
dotenv_1.default.config();
const app = (0, express_1.default)();
const start = async () => {
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use('/api/auth', auth_router_1.authRouter);
    app.use('/api/user', user_router_1.userRouter);
    app.use('/api/ai', ai_router_1.aiRouter);
    app.use('/api/model', model_router_1.modelRouter);
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpecs));
    app.use(error_middleware_1.ErrorMiddleware);
    (0, db_config_1.configDb)();
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server started on port ${process.env.PORT || 3000}`);
    });
};
start();
