-- AlterTable
ALTER TABLE "public"."order_item_breakdowns" ADD COLUMN     "agrohubConfirmsPayment" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "farmerConfirmsPayment" BOOLEAN NOT NULL DEFAULT false;
