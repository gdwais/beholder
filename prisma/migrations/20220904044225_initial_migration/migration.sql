-- CreateEnum
CREATE TYPE "NftTrait" AS ENUM ('Anime', 'Cartoon', 'Degen', 'Modern', 'Pixel', 'Scifi', 'Token');

-- CreateTable
CREATE TABLE "Nft" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "mint" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Nft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trait" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "mint" TEXT NOT NULL,
    "trait" "NftTrait" NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Trait_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nft_mint_key" ON "Nft"("mint");

-- AddForeignKey
ALTER TABLE "Trait" ADD CONSTRAINT "Trait_mint_fkey" FOREIGN KEY ("mint") REFERENCES "Nft"("mint") ON DELETE RESTRICT ON UPDATE CASCADE;
