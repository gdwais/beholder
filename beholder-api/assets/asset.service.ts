import { AssetRepository } from "./asset.repository";
import { Logger } from "../core/logger";
import { ExpandedAsset } from "../types";

export class AssetService {
  private logger: Logger;
  private repo: AssetRepository;

  constructor(logger: Logger, repo: AssetRepository) {
    this.logger = logger;
    this.repo = repo;
  }

  public async getAll(): Promise<ExpandedAsset[]> {
    return await this.repo.getAllAssets();
  }

  public async getTopNftsByTrait(trait: string) {
    const topResults = await this.repo.getTopAssetsByTrait(trait);
    return await this.repo.getByMints(topResults.map((r) => r.mint));
  }

  public async getByMint(mint: string) {
    return await this.repo.getByMint(mint);
  }

  public async getTraits() {
    return await this.repo.getTraits();
  }
}
