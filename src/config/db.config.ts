import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const configDb = async () => {
 if (await prisma.aiModel.findUnique({where: {id: "gpt"}})) {
   return;
 }
 await prisma.aiModel.create({
     data: {
       id: "gpt",
       chatId: "98944187-9870-4bdd-96d8-4c51ddb3409e",
       costPerToken: 0.05
     }
 })
};

export { configDb };
