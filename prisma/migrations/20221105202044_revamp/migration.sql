/*
  Warnings:

  - You are about to drop the `nfts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `traits` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "asset_trait_type" AS ENUM ('Anime', 'Cartoon', 'Degen', 'Modern', 'Pixel', 'Scifi', 'Token');

-- DropForeignKey
ALTER TABLE "traits" DROP CONSTRAINT "traits_mint_fkey";

-- DropTable
DROP TABLE "nfts";

-- DropTable
DROP TABLE "traits";

-- DropEnum
DROP TYPE "nft_trait_type";

-- CreateTable
CREATE TABLE "wallets" (
    "id" TEXT NOT NULL,
    "wallet_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluated_assets" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "mint" TEXT NOT NULL,
    "wallet_id" TEXT NOT NULL,

    CONSTRAINT "evaluated_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluated_asset_traits" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,
    "evaluated_asset_id" TEXT NOT NULL,

    CONSTRAINT "evaluated_asset_traits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "mint" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_traits" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "mint" TEXT NOT NULL,
    "traitType" "asset_trait_type" NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "asset_traits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wallets_wallet_id_key" ON "wallets"("wallet_id");

-- CreateIndex
CREATE UNIQUE INDEX "assets_mint_key" ON "assets"("mint");

-- AddForeignKey
ALTER TABLE "evaluated_assets" ADD CONSTRAINT "evaluated_assets_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluated_assets" ADD CONSTRAINT "evaluated_assets_mint_fkey" FOREIGN KEY ("mint") REFERENCES "assets"("mint") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluated_asset_traits" ADD CONSTRAINT "evaluated_asset_traits_evaluated_asset_id_fkey" FOREIGN KEY ("evaluated_asset_id") REFERENCES "evaluated_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_traits" ADD CONSTRAINT "asset_traits_mint_fkey" FOREIGN KEY ("mint") REFERENCES "assets"("mint") ON DELETE RESTRICT ON UPDATE CASCADE;
