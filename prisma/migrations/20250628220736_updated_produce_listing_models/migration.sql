/*
  Warnings:

  - You are about to drop the column `harvestDate` on the `produce_listings` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `produce_listings` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `produce_listings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ActiveDraftStatus" AS ENUM ('active', 'draft');

-- AlterTable
ALTER TABLE "public"."produce_listings" DROP COLUMN "harvestDate",
DROP COLUMN "status",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "public"."ListingStatus";

-- CreateTable
CREATE TABLE "public"."active_draft_listings" (
    "id" UUID NOT NULL,
    "status" "public"."ActiveDraftStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "listingId" UUID NOT NULL,

    CONSTRAINT "active_draft_listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."harvest_listings" (
    "id" UUID NOT NULL,
    "harvestDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "listingId" UUID NOT NULL,

    CONSTRAINT "harvest_listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sold_listings" (
    "id" UUID NOT NULL,
    "soldDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "soldPrice" TEXT NOT NULL,
    "buyerInfo" TEXT,
    "deliveryDate" TIMESTAMP(3),
    "soldNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "listingId" UUID NOT NULL,

    CONSTRAINT "sold_listings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "active_draft_listings_listingId_key" ON "public"."active_draft_listings"("listingId");

-- AddForeignKey
ALTER TABLE "public"."active_draft_listings" ADD CONSTRAINT "active_draft_listings_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "public"."produce_listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."harvest_listings" ADD CONSTRAINT "harvest_listings_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "public"."produce_listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sold_listings" ADD CONSTRAINT "sold_listings_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "public"."produce_listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
