import { Request, Response, NextFunction} from "express";
import { BadRequest } from "../errors/error";
import { isAdmin } from "../helpers/admin";
import { ModelService } from "../services/model.service";

const modelService = new ModelService();

class ModelController {
  async addModel(req: Request, res: Response, next: NextFunction) {
    try {
      const user_data = res.locals.user;
      isAdmin(user_data.role);
      const { name, cost } = req.body;
      if (!name || !cost) {
        throw BadRequest("Name and cost are required");
      }
      const chat = await modelService.addModel(name, cost);
      res.json(chat);
    } catch(error) {
      next(error);
    }
  }

  async getModels(req: Request, res: Response, next: NextFunction) {
    try {
    const models = await modelService.getAllModels();
    res.json(models);
  } catch(error) {
    next(error);
  }
  }
}

export { ModelController };
