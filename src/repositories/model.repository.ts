import { PrismaClient } from "@prisma/client";
import { AiModel } from "@prisma/client";
import { ApiError } from "../errors/error";
import { UpdateModelDto } from "./dto/model.dto";

class ModelRepository {
  constructor(private readonly prisma: PrismaClient) {}


  async addModel(modelId: string, chatId: string, cost: number): Promise<AiModel> {
    try {
    const model = await this.prisma.aiModel.create({
      data: {
        id: modelId,
        chatId: chatId,
        costPerToken: cost, 
      }
    });
    return model;
    } catch(error) {
      throw new ApiError(error.message || "Failed to create model", 500);
    }
  }
  async getModel(id: string): Promise<AiModel | null> {
    const model = await this.prisma.aiModel.findUnique({
      where: {
        id
      }
    });
    return model;
  };

  async updateModel(id: string, dto: UpdateModelDto) {
    const model = await this.prisma.aiModel.update({
      where: { id }, 
      data: {
        ...dto
      }
  });
  }
  
  async getAllModels() {
    const models = await this.prisma.aiModel.findMany();
    return models;
  }
}

export { ModelRepository };
