import { Repository } from "./repository";
import { TTrait } from "./types";
import { Logger } from "./logger";




export class Service {
  private logger: Logger;
  private repo: Repository;

  private traitMap: string[] = [
    "Anime",
    "Cartoon",
    "Degen",
    "Modern",
    "Pixel",
    "Scifi",
    "Token",
  ];

  constructor(logger: Logger, repo: Repository) {
    this.logger = logger;
    this.repo = repo;
  }

  public async getAll() {
    return await this.repo.getAllNfts();
  }

  public async getByMint(mint: string) {
    return await this.repo.getByMint(mint);
  }

  public async savePrediction(
    mint: string,
    image: string,
    name: string,
    results: Float32Array
  ): Promise<string> {
    try {
      //todo: have this read from the model labels.txt file or from the db directly?

      const traits = this.traitMap.map((trait, index) => {
        return {
          mint,
          trait: trait,
          percentage: results[index],
        } as TTrait;
      });

      await this.repo.upsertNft(mint, name, image);
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
