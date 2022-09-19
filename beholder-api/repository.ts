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

  public async getTopNftsByTrait(trait: NftTrait): Promise<TNft[]> {
    const traits = await this.db.trait.findMany({
      where: {
        trait,
      },
      include: {
        nft: {
          include: {
            traits: true,
          },
        },
      },
      take: 40,
    });

    return traits.map((t) => t.nft);
  }

  public async getByMint(mint: string) {
    return await this.db.nft.findUnique({
      where: { mint },
      include: { traits: true },
    });
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