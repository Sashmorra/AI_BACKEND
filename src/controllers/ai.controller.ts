import { Request, Response, NextFunction } from "express";
import { BadRequest } from "../errors/error";
import { AiService } from "../services/ai.service";

const aiService = new AiService();
class AiController {
 async generate(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;
    const { email } = user;
    const { modelId, promt } = req.body;
    if (!modelId || !promt) {
      throw BadRequest("ModelId and promt are required");
    }
   const answer = await aiService.generate(modelId, promt, email); 
   res.json(answer);
  } catch(error) {
    next(error);
  }
 }

}


export { AiController };
