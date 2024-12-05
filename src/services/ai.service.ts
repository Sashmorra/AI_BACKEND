import { AiHttpService } from "./http/http.ai.service";
import { axiosInstance } from "../config/http.config";
import { HttpChatService } from "./http/http.chat.service";
import { ModelService } from "./model.service";
import { ApiError, BadRequest } from "../errors/error";
import { UserRepository } from "../repositories/user.repository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const modelService = new ModelService();
const userService = new UserRepository(prisma);
const aiHttpService = new AiHttpService(axiosInstance);
const chatHttpService = new HttpChatService(axiosInstance);

class AiService {
  async generate(modelId: string, promt: string, userEmail: string) {
    const userBalance = await userService.getUserByEmail(userEmail);
    if (userBalance.credits < 0) {
      throw new ApiError("Not enough balance", 400);
    }
    const model = await modelService.getModel(modelId);
    if (!model) {
      throw BadRequest("Model not found");
    }
    let chatId = model.chatId;
    const isActive = await chatHttpService.isActiveChat(chatId);
    if (!isActive) {
      const chatData: any = await chatHttpService.createChat(model.id, model.id);
      chatId = chatData.id;
      await modelService.updateModel(model.id, { chatId: chatData.id });
    }
    const messageId = await aiHttpService.generate(chatId, promt);

    let message;
    while (true) {
      const statusMessage: any = await aiHttpService.getMessage(messageId);
      if (statusMessage.status === "DONE") {
        message = statusMessage;
        break;
      } else if (statusMessage.status === "FAILED") {
        throw new Error("Message generation failed");
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    const { content, tokens } = message;
    const messageCost = tokens * model.costPerToken;
    await userService.updateUser(userEmail, { credits: userBalance.credits - messageCost });
    await userService.pushResponse(userEmail, content);
    return { content, messageCost };
  }
}

export { AiService };
