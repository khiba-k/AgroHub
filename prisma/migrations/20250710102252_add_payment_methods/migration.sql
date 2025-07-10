-- CreateEnum
CREATE TYPE "public"."PaymentType" AS ENUM ('EFT', 'MPESA', 'ECOCASH');

-- AlterTable
ALTER TABLE "public"."farms" ADD COLUMN     "hasPaymentMethod" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "public"."payment_methods" (
    "id" UUID NOT NULL,
    "farmId" UUID NOT NULL,
    "type" "public"."PaymentType" NOT NULL,
    "isPrimary" BOOLEAN NOT NULL,
    "isMerchant" BOOLEAN,
    "accountHolder" TEXT,
    "accountNumber" TEXT,
    "accountType" TEXT,
    "bankName" TEXT,
    "branchCode" TEXT,
    "merchantName" TEXT,
    "merchantNumber" TEXT,
    "recipientName" TEXT,
    "cellphoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."payment_methods" ADD CONSTRAINT "payment_methods_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "public"."farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
