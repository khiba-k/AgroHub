/*
  Warnings:

  - A unique constraint covering the columns `[listingId]` on the table `harvest_listings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."produce_listings" ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "quantity" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "harvest_listings_listingId_key" ON "public"."harvest_listings"("listingId");
