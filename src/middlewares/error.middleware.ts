import { ApiError } from "../errors/error";
import { NextFunction, Request, Response } from "express";


const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if(err.type === "entity.parse.failed"){
      return res.status(400).json({ message: "Invalid JSON format" });
    }
    if(err instanceof ApiError) {
    return res.status(err.status).json({message: err.message});
  }
  return res.status(500).json({message: 'Something went wrong'});
}

export { ErrorMiddleware }; 
