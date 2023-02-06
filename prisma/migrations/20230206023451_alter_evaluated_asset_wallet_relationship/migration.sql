-- DropForeignKey
ALTER TABLE "evaluated_assets" DROP CONSTRAINT "evaluated_assets_wallet_id_fkey";

-- AddForeignKey
ALTER TABLE "evaluated_assets" ADD CONSTRAINT "evaluated_assets_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("wallet_id") ON DELETE RESTRICT ON UPDATE CASCADE;
