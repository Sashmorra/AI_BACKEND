import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import { authRouter } from "./routes/auth.router";
import { userRouter } from "./routes/user.router";
import { aiRouter } from "./routes/ai.router"; 
import { modelRouter } from "./routes/model.router";
import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "./swagger";
import { configDb } from "./config/db.config";
dotenv.config();


const app = express();

const start = async () => {
  app.use(express.json());
  app.use(cookieParser());

  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/ai', aiRouter); 
  app.use('/api/model', modelRouter);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

  app.use(ErrorMiddleware);

  configDb();
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
  });
}

start()
