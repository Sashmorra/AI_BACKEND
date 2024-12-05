import { ApiError } from "../errors/error";


const isAdmin = (role: string) => {
  if (role !== "ADMIN") {
    throw new ApiError("Access denied", 403);
  }
}

export { isAdmin };
