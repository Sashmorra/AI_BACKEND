import { ApiError } from "../../errors/error";


class HttpChatService {
  constructor(private readonly axios: Axios.AxiosInstance) {}
  async createChat(modelId: string, name: string) {
    try {
    const res =  await this.axios.post("/chat", {
        modelId: modelId,
        name: name
    });
    return res.data;
    } catch(error){
        if(error.response?.status === 404) {
          throw new ApiError("Model not found on our AI API", 404);
      }
      throw new ApiError(error.resposne?.data?.message || "Falied to generate", error.response?.status || 500);
    }
  }

  async isActiveChat(chatId: string) {
    try {
      const res = await this.axios.get(`/chat/${chatId}`);
      if (res.status !== 200) {
        return false;
      }
      return true;
    }
    catch(error) { 
      return false;
    }
  }
}


export { HttpChatService };
