/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `farms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `farms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."farms" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "farms_name_key" ON "public"."farms"("name");
