/*
  Warnings:

  - The primary key for the `password_reset_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `password_reset_tokens` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."ListingStatus" AS ENUM ('active', 'harvest', 'draft');

-- AlterTable
ALTER TABLE "public"."password_reset_tokens" DROP CONSTRAINT "password_reset_tokens_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "public"."produce" (
    "id" UUID NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "unitType" TEXT NOT NULL,
    "pricePerUnit" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produce_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."listing_imgs" (
    "id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "listingId" UUID NOT NULL,

    CONSTRAINT "listing_imgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."produce_listings" (
    "id" UUID NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "public"."ListingStatus" NOT NULL,
    "harvestDate" TIMESTAMP(3),
    "produceId" UUID NOT NULL,
    "farmId" UUID NOT NULL,

    CONSTRAINT "produce_listings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."listing_imgs" ADD CONSTRAINT "listing_imgs_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "public"."produce_listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produce_listings" ADD CONSTRAINT "produce_listings_produceId_fkey" FOREIGN KEY ("produceId") REFERENCES "public"."produce"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produce_listings" ADD CONSTRAINT "produce_listings_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "public"."farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
