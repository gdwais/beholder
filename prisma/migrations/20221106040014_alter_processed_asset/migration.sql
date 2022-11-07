/*
  Warnings:

  - You are about to drop the `asset_traits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "asset_traits" DROP CONSTRAINT "asset_traits_mint_fkey";

-- DropTable
DROP TABLE "asset_traits";

-- CreateTable
CREATE TABLE "processed_assets" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "mint" TEXT NOT NULL,

    CONSTRAINT "processed_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processed_asset_traits" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "mint" TEXT NOT NULL,
    "trait" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "processed_asset_traits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "processed_assets_mint_key" ON "processed_assets"("mint");

-- AddForeignKey
ALTER TABLE "processed_assets" ADD CONSTRAINT "processed_assets_mint_fkey" FOREIGN KEY ("mint") REFERENCES "assets"("mint") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processed_asset_traits" ADD CONSTRAINT "processed_asset_traits_mint_fkey" FOREIGN KEY ("mint") REFERENCES "processed_assets"("mint") ON DELETE RESTRICT ON UPDATE CASCADE;
