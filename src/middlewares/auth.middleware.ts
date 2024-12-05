 import { Unauthorized } from "../errors/error";
import { Request, Response, NextFunction } from "express";
import { TokenService } from "../services/token.service";

const tokenService = new TokenService();

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
      throw Unauthorized();
    }
    const accessToken = authHeader.split(' ')[1];
    if(!accessToken) {
      throw Unauthorized();
    }
    const payload = await tokenService.validateAccessToken(accessToken);
    if(!payload) {
      throw Unauthorized();
    }
    res.locals.user = payload;
    next();
  } catch(error) {
    next(Unauthorized());
  }
};

export { authMiddleware };
