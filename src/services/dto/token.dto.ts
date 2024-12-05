
type PayloadDto = {
  email: string;
  role?: string;
}

type Tokens = {
  accessToken: string;
  refreshToken: string;
}
export { PayloadDto, Tokens };
