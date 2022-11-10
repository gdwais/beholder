import { Prisma, PrismaClient } from "@prisma/client";
import { Nft } from "../services/file.service";

export class Repository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async saveProcessedTraits(
    mint: string,
    data: { mint: string; trait: string; percentage: number }[]
  ): Promise<boolean | any> {
    await this.db.processedAssetTrait.deleteMany({ where: { mint } });

    try {
      await this.db.processedAssetTrait.createMany({ data });
      return true;
    } catch (err: any) {
      console.error(err);
      return false;
    }
  }

  async saveAssets(data: Nft[]) {
    await this.db.asset.createMany({ data });
  }

  async getAssets(): Promise<Nft[]> {
    return (await this.db.asset.findMany()) as Nft[];
  }
}
