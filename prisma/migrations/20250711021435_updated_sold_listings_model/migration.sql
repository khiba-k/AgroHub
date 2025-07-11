/*
  Warnings:

  - You are about to drop the column `buyerInfo` on the `sold_listings` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryDate` on the `sold_listings` table. All the data in the column will be lost.
  - You are about to drop the column `soldDate` on the `sold_listings` table. All the data in the column will be lost.
  - You are about to drop the column `soldNotes` on the `sold_listings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[listingId]` on the table `sold_listings` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `soldPrice` on the `sold_listings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."sold_listings" DROP COLUMN "buyerInfo",
DROP COLUMN "deliveryDate",
DROP COLUMN "soldDate",
DROP COLUMN "soldNotes",
DROP COLUMN "soldPrice",
ADD COLUMN     "soldPrice" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sold_listings_listingId_key" ON "public"."sold_listings"("listingId");
