/*
  Warnings:

  - A unique constraint covering the columns `[mint,wallet_id]` on the table `evaluated_assets` will be added. If there are existing duplicate values, this will fail.

*/
-- DropEnum
DROP TYPE "asset_trait_type";

-- CreateIndex
CREATE UNIQUE INDEX "evaluated_assets_mint_wallet_id_key" ON "evaluated_assets"("mint", "wallet_id");
