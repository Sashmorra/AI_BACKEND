"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const error_1 = require("../errors/error");
const isAdmin = (role) => {
    if (role !== "ADMIN") {
        throw new error_1.ApiError("Access denied", 403);
    }
};
exports.isAdmin = isAdmin;
