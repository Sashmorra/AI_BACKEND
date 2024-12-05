import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { Request, Response, NextFunction } from "express";
import { isAdmin } from "../helpers/admin";

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const user_data = res.locals.user;
      isAdmin(user_data.role);
      const users = await userRepository.getAllUsers();
      res.json(users);
    } catch(error) {
        next(error);
    }
  }

  async updateUserBalance(req: Request, res: Response, next: NextFunction) {
   try {
     const user_data = res.locals.user;
     isAdmin(user_data.role);
     const { email, credits } = req.body;
     const user = await userRepository.updateUser(email, { credits: credits });
     res.json(user);
   } catch(error) {
     next(error);   
   }
  }
}

export { UserController };
