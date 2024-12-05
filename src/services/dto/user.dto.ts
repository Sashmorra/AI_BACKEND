
type RegisterUserDto = {
  email: string;
  password: string;
  role: string;
}

type LoginUserDto = {
  email: string;
  password: string;
}

type UpdateUserDto = {
  email?: string;
  password?: string;
  token?: string;
  credits?: number;
  responses?: string[];
}

export { RegisterUserDto, LoginUserDto, UpdateUserDto };
