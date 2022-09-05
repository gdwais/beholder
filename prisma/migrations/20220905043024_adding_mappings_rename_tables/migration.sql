/*
  Warnings:

  - You are about to drop the `Nft` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trait` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "nft_trait_type" AS ENUM ('Anime', 'Cartoon', 'Degen', 'Modern', 'Pixel', 'Scifi', 'Token');

-- DropForeignKey
ALTER TABLE "Trait" DROP CONSTRAINT "Trait_mint_fkey";

-- DropTable
DROP TABLE "Nft";

-- DropTable
DROP TABLE "Trait";

-- DropEnum
DROP TYPE "NftTrait";

-- CreateTable
CREATE TABLE "nfts" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "mint" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "nfts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "traits" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "mint" TEXT NOT NULL,
    "trait" "nft_trait_type" NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "traits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nfts_mint_key" ON "nfts"("mint");

-- AddForeignKey
ALTER TABLE "traits" ADD CONSTRAINT "traits_mint_fkey" FOREIGN KEY ("mint") REFERENCES "nfts"("mint") ON DELETE RESTRICT ON UPDATE CASCADE;
