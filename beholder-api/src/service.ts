import { NftTrait } from "@prisma/client";
import { Repository } from "./repository";
import { TraitContract } from "./types";
import { Logger } from "./logger";

export class Service {
  private logger: Logger;
  private repo: Repository;

  constructor(logger: Logger, repo: Repository) {
    this.logger = logger;
    this.repo = repo;
  }

  public async savePrediction(
    mint: string,
    image: string,
    results: Float32Array
  ): Promise<string> {
    try {
      const traitMap = Object.values(NftTrait);
      const traits = Array.from(results).map((percentage, index) => {
        return { mint, trait: traitMap[index], percentage } as TraitContract;
      });

      await this.repo.upsertNft(mint, image);
      await this.repo.deleteTraits(mint);
      await this.repo.saveTraits(traits);

      this.logger.log(`${mint} predictions saved succesfully`);
    } catch (error: any) {
      this.logger.error("savePrediction failed", error);
      return "there was an error.  please try again";
    }

    return "success";
  }
}
