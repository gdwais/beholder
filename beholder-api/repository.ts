import { Nft, NftTrait, PrismaClient } from "@prisma/client";
import { TTrait, TNft } from "./types";

export class Repository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  public async getAllNfts() {
    return await this.db.nft.findMany({ include: { traits: true } });
  }

  public async getTopNftsByTrait(trait: NftTrait): Promise<{mint: string; percentage: number;}[]> {
    const topResults: {mint: string; percentage: number}[] = await this.db.$queryRaw`
          SELECT DISTINCT mint, percentage
      FROM traits
      WHERE trait = ${trait}
      ORDER BY percentage DESC
      LIMIT 100;`;

    return topResults;
  }

  public async getByMint(mint: string) {
    return await this.db.nft.findUnique({
      where: { mint },
      include: { traits: true },
    });
  }

  public async getByMints(mints: string[]): Promise<TNft[]> {
    return await this.db.nft.findMany({ 
      where: {
        mint: {
          in: mints
        }
      }, include: { traits: true }
    })
  }

  public async getTraits() {
    const result = await this.db.$queryRaw`select distinct trait from traits;`;
    return result;
  }

  public async upsertNft(
    mint: string,
    name: string,
    image: string
  ): Promise<Nft | null> {
    return await this.db.nft.upsert({
      where: { mint },
      create: { mint, name, image },
      update: {
        image,
      },
    });
  }

  public async deleteTraits(mint: string) {
    return await this.db.trait.deleteMany({ where: { mint } });
  }

  public async saveTraits(data: TTrait[]) {
    return await this.db.trait.createMany({ data });
  }
}
