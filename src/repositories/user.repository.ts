import { PrismaClient } from "@prisma/client/extension";
import { RegisterUserDto, UpdateUserDto } from "../services/dto/user.dto";
import { Tokens } from "../services/dto/token.dto";
import { ApiError } from "../errors/error";
import { User } from "@prisma/client";

class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(dto: RegisterUserDto, tokens: Tokens) {
    try {
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
        role: dto.role || "CLIENT",
        credits: 100,
        token: tokens.refreshToken,
      }
    });
    return user;
  } catch (error) {
    throw new ApiError("Failed to create user", 500); 
  }}

    async updateUser(email: string, dto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          email
        },
        data: {
          ...dto
        }
       });
      return user;
    } catch(error) {
      throw new ApiError("Failed to update user", 500);
    }
  }
  async pushResponse(email: string, response: string) {
    try {
      const user = await this.prisma.user.update({
        where: {
          email
        },
        data: {
          responses: {
            push: response
          }
        }
       });
      return user;
    } catch(error) {
      throw new ApiError("Failed to push response", 500);
    }
  }
  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
      where: {
         email
        }
      });
      return user;
    } catch (error) {
      throw new ApiError("Failed to get user", 500); 
    }
  }

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }
}



export { UserRepository };
