import { PayloadDto, Tokens } from "./dto/token.dto";
import { sign, verify} from 'jsonwebtoken'

class TokenService {
  constructor() {}

  async generateTokens(payload: PayloadDto): Promise<Tokens> {
    const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET || 'secret', { expiresIn: '15d' });
    const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET || 'secret', { expiresIn: '30d' });
    return { accessToken, refreshToken };
  }

  async validateRefreshToken(token: string): Promise<PayloadDto | null> {
    try {
      const payload = verify(token, process.env.JWT_REFRESH_SECRET || 'secret');
      return payload as PayloadDto;
    }
    catch {
      return null;
    }
  }
  async validateAccessToken(token: string): Promise<PayloadDto | null> {
    try {
      const payload = verify(token, process.env.JWT_ACCESS_SECRET || 'secret');
      return payload as PayloadDto;
    }
    catch {
      return null;
    }
  }
}



export { TokenService };
