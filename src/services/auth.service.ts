import { BadRequest, Unauthorized } from "../errors/error";
import { LoginUserDto, RegisterUserDto } from "./dto/user.dto";
import { UserRepository } from "../repositories/user.repository";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { TokenService } from "./token.service";

const prisma = new PrismaClient()
const userRepository = new UserRepository(prisma);
const tokenService = new TokenService();

class AuthService {
 async registration(dto: RegisterUserDto) {
    const candidate = await userRepository.getUserByEmail(dto.email); 
    if (candidate) {
      throw BadRequest("User with this email already exists");
    }
    const hashPassword = await bcrypt.hash(dto.password, process.env.SALT || 10);
    const tokens = await tokenService.generateTokens({email: dto.email, role: dto.role || "CLIENT"});
    await userRepository.createUser({email: dto.email, password: hashPassword, role: dto.role }, tokens)
    return tokens; 
 }

 async login(dto: LoginUserDto) {
    const user = await userRepository.getUserByEmail(dto.email);
    if (!user) {
      throw BadRequest("User with this email not found");
    }
    const isPassEquals = bcrypt.compareSync(dto.password, user.password);
    if (!isPassEquals) {
      throw BadRequest("Wrong password");
    } 
    const tokens = await tokenService.generateTokens({email: user.email, role: user.role});
    await userRepository.updateUser(user.email, {token: tokens.refreshToken});
    return tokens;
 }
 async refresh(refreshToken: string) {
   if (!refreshToken) {
     throw BadRequest("Token is required");
   }
   const userData = await tokenService.validateRefreshToken(refreshToken);
   if (!userData) {
     throw Unauthorized();
   }
   const user = await userRepository.getUserByEmail(userData.email);
   if (!user) {
     throw Unauthorized();
   }
   const tokens = await tokenService.generateTokens({email: userData.email, role: userData.role});
   await userRepository.updateUser(userData.email, {token: tokens.refreshToken});
   return tokens;
 }
}


export { AuthService };
