/*
  Warnings:

  - Added the required column `soldQuantity` to the `sold_listings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."sold_listings" ADD COLUMN     "soldQuantity" INTEGER NOT NULL;
