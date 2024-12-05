/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `AiModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AiModel_name_key" ON "AiModel"("name");
