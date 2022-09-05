import { Nft, NftTrait, PrismaClient } from "@prisma/client";
import { TraitContract } from "./types";

export class Repository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  public async upsertNft(mint: string, image: string): Promise<Nft | null> {
    return await this.db.nft.upsert({
      where: { mint },
      create: { mint, image },
      update: {
        image,
      },
    });
  }

  public async deleteTraits(mint: string) {
    return await this.db.nft.deleteMany({ where: { mint } });
  }

  public async saveTraits(data: TraitContract[]) {
    return await this.db.trait.createMany({ data });
  }
}
