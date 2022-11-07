/*
  Warnings:

  - You are about to drop the `processed_assets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "processed_asset_traits" DROP CONSTRAINT "processed_asset_traits_mint_fkey";

-- DropForeignKey
ALTER TABLE "processed_assets" DROP CONSTRAINT "processed_assets_mint_fkey";

-- DropTable
DROP TABLE "processed_assets";

-- AddForeignKey
ALTER TABLE "processed_asset_traits" ADD CONSTRAINT "processed_asset_traits_mint_fkey" FOREIGN KEY ("mint") REFERENCES "assets"("mint") ON DELETE RESTRICT ON UPDATE CASCADE;
