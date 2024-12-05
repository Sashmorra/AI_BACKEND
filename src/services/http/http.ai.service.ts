import { ApiError } from "../../errors/error";



class AiHttpService {
  constructor(private readonly axiosInstance: Axios.AxiosInstance) {}

  async generate(chatId: string, promt: string) {
    try {
      const response: any = await this.axiosInstance.post("/message/send", { chatId, message: promt }); 
      return response.data.id; 
    } catch (error) {
      throw new ApiError("Faliead to generate", 500);
    }
  }

  async getMessage(messageId: string) {
      const response = await this.axiosInstance.get(`/message/${messageId}`);
      if (response.status !== 200) {
        throw new ApiError("Message not found", 404);
      }
      return response.data; 
  }
}
export { AiHttpService };
