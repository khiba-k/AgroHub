-- CreateTable
CREATE TABLE "public"."agrohub_users" (
    "id" UUID NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agrohub_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agrohub_users_firstname_key" ON "public"."agrohub_users"("firstname");

-- CreateIndex
CREATE UNIQUE INDEX "agrohub_users_lastname_key" ON "public"."agrohub_users"("lastname");

-- CreateIndex
CREATE UNIQUE INDEX "agrohub_users_userId_key" ON "public"."agrohub_users"("userId");
