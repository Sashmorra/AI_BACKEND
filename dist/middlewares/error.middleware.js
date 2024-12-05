"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const error_1 = require("../errors/error");
const ErrorMiddleware = (err, req, res, next) => {
    console.error(err);
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ message: "Invalid JSON format" });
    }
    if (err instanceof error_1.ApiError) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Something went wrong' });
};
exports.ErrorMiddleware = ErrorMiddleware;
