import { PrismaClient } from "@prisma/client";
import { ModelRepository } from "../repositories/model.repository";
import { axiosInstance } from "../config/http.config";
import { HttpChatService } from "./http/http.chat.service";
import { BadRequest } from "../errors/error";
import { UpdateModelDto } from "../repositories/dto/model.dto";

const prisma = new PrismaClient();
const modelRepository = new ModelRepository(prisma);
const httpChatService = new HttpChatService(axiosInstance);

class ModelService {
  constructor() {}
  
  async addModel(modelId: string, costPerToken: number) {
    const model = await modelRepository.getModel(modelId);
    if (model) {
      throw BadRequest("Model already exists");
    }
    const chatData: any= await httpChatService.createChat(modelId, modelId);
    const newModel = await modelRepository.addModel(modelId, chatData.id, costPerToken);
    return newModel;
  }
  async getAllModels() {
    const models = await modelRepository.getAllModels();
    return models;
  }
  
  async getModel(id: string) {
    const model = await modelRepository.getModel(id);
    return model;
  }

  async updateModel(id: string, dto: UpdateModelDto) {
    await modelRepository.updateModel(id, dto);
    return;
  }
}


export { ModelService };
