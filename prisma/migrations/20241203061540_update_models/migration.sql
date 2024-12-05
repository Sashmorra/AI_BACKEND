/*
  Warnings:

  - You are about to drop the column `name` on the `AiModel` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `AiResponse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AiResponse" DROP CONSTRAINT "AiResponse_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "AiResponse" DROP CONSTRAINT "AiResponse_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_ai_model_id_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_user_id_fkey";

-- DropIndex
DROP INDEX "AiModel_id_key";

-- DropIndex
DROP INDEX "AiModel_name_key";

-- AlterTable
ALTER TABLE "AiModel" DROP COLUMN "name",
ADD COLUMN     "chatId" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "AiModel_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AiModel_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "responses" TEXT[];

-- DropTable
DROP TABLE "AiResponse";

-- DropTable
DROP TABLE "Chat";
