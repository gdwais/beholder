import { Asset, PrismaClient } from "@prisma/client";
import { ExpandedAsset } from "../types";

export class AssetRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  public async getAllAssets(): Promise<ExpandedAsset[]> {
    const result = await this.db.asset.findMany({
      include: {
        processedTraits: true,
        evaluatedAssets: true,
      },
    });

    return result as ExpandedAsset[];
  }

  public async getTopAssetsByTrait(
    trait: string
  ): Promise<{ mint: string; percentage: number }[]> {
    const topResults: { mint: string; percentage: number }[] = await this.db
      .$queryRaw`
          SELECT DISTINCT mint, percentage
      FROM processed_asset_traits
      WHERE trait = ${trait}
      ORDER BY percentage DESC
      LIMIT 100;`;

    return topResults;
  }

  public async getByMint(mint: string) {
    return await this.db.asset.findUnique({
      where: { mint },
      include: {
        processedTraits: true,
        evaluatedAssets: true,
      },
    });
  }

  public async getByMints(mints: string[]): Promise<Asset[]> {
    return await this.db.asset.findMany({
      where: {
        mint: {
          in: mints,
        },
      },
      include: { processedTraits: true },
    });
  }

  public async getTraits(): Promise<string[]> {
    const result: { trait: string }[] = await this.db
      .$queryRaw`select distinct trait from processed_asset_traits;`;

    return result.map((t) => t.trait);
  }
}
