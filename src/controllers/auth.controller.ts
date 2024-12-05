import { Request, Response, NextFunction } from "express";
import { BadRequest } from "../errors/error";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, role } = req.body;
      if (!email || !password) {
        throw BadRequest("Email, password are required");
      }
      const tokens = await authService.registration({email, password, role});
      res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      res.json(tokens);
    } catch(error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
       const { email, password } = req.body;
       const tokens = await authService.login({ email, password });
       res.cookie("refreshToken", tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
       res.json(tokens);
    } catch(error) {
      next(error);
    }
  }
  
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const tokens = await authService.refresh(refreshToken);
      res.cookie("refreshToken", tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json(tokens);
    } catch(error) {
      next(error);
    }
  }
}

export { AuthController };
