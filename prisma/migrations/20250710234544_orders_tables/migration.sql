-- CreateEnum
CREATE TYPE "public"."BreakdownStatus" AS ENUM ('PROCESSING', 'READY_FOR_PICKUP');

-- CreateEnum
CREATE TYPE "public"."OrderParty" AS ENUM ('AGROHUB', 'FARMER');

-- CreateTable
CREATE TABLE "public"."orders" (
    "id" UUID NOT NULL,
    "orderNumber" INTEGER NOT NULL,
    "buyerId" UUID NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order_items" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "produceId" UUID NOT NULL,
    "unitType" TEXT NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order_item_breakdowns" (
    "id" UUID NOT NULL,
    "orderItemId" UUID NOT NULL,
    "produceListingId" UUID NOT NULL,
    "farmId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "public"."BreakdownStatus" NOT NULL DEFAULT 'PROCESSING',
    "farmerConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "farmerShipped" BOOLEAN NOT NULL DEFAULT false,
    "agrohubShipped" BOOLEAN NOT NULL DEFAULT false,
    "delivered" BOOLEAN NOT NULL DEFAULT false,
    "cancelledBy" "public"."OrderParty",
    "paymentProofUrl" TEXT,
    "invoiceUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_item_breakdowns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_orderNumber_key" ON "public"."orders"("orderNumber");

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "public"."agrohub_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_produceId_fkey" FOREIGN KEY ("produceId") REFERENCES "public"."produce"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_item_breakdowns" ADD CONSTRAINT "order_item_breakdowns_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "public"."order_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_item_breakdowns" ADD CONSTRAINT "order_item_breakdowns_produceListingId_fkey" FOREIGN KEY ("produceListingId") REFERENCES "public"."produce_listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_item_breakdowns" ADD CONSTRAINT "order_item_breakdowns_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "public"."farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
