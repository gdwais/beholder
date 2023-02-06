import { Asset, PrismaClient } from "@prisma/client";
import { ExpandedAsset, Nft } from "../types";

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

  public async getByMint(mint: string): Promise<ExpandedAsset | undefined> {
    return (await this.db.asset.findUnique({
      where: { mint },
      include: {
        processedTraits: true,
        evaluatedAssets: true,
      },
    })) as ExpandedAsset;
  }

  public async getByMints(mints: string[]): Promise<ExpandedAsset[]> {
    return (await this.db.asset.findMany({
      where: {
        mint: {
          in: mints,
        },
      },
      include: { processedTraits: true, evaluatedAssets: true },
    })) as ExpandedAsset[];
  }

  public async getTraits(): Promise<string[]> {
    const result: { trait: string }[] = await this.db
      .$queryRaw`select distinct trait from processed_asset_traits;`;

    return result.map((t) => t.trait);
  }

  public async getRandomAssetForEvaluator(
    walletId: string
  ): Promise<string | undefined> {
    const result: { mint: string }[] = await this.db.$queryRaw<
      { mint: string }[]
    >`SELECT mint
      FROM assets
      WHERE mint NOT IN (SELECT mint FROM evaluated_assets WHERE wallet_id = ${walletId})
      ORDER BY RANDOM()
      LIMIT 1;`;

    if (result.length > 0) {
      return result[0].mint;
    }

    return;
  }

  public async saveEvaluationAsset(mint: string, walletId: string) {
    return await this.db.evaluatedAsset.create({
      data: {
        walletId,
        mint,
      },
    });
  }

  public async saveEvaluationAssetTraits(
    data: { evaluatedAssetId: string; value: string }[]
  ) {
    await this.db.evaluatedAssetTrait.createMany({ data });
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

  async getAssets(): Promise<Asset[]> {
    return (await this.db.asset.findMany()) as Asset[];
  }
}
