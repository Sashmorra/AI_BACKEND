"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = exports.BadRequest = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.message = message;
        this.status = status;
    }
}
exports.ApiError = ApiError;
const BadRequest = (message) => {
    return new ApiError(message, 400);
};
exports.BadRequest = BadRequest;
const Unauthorized = (message) => {
    return new ApiError(message || "Unauthorized", 401);
};
exports.Unauthorized = Unauthorized;
