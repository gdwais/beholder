import { Decimal } from "@prisma/client/runtime";
import { performance } from "perf_hooks";
import {
  BeholderAdapter,
  PredictionContract,
} from "../adapters/beholder.adapter";
import { Logger } from "../core/logger";
import { Repository } from "../core/repository";
import { FileService } from "../services/file.service";
import { PredictionService } from "../services/prediction.service";

import { Nft } from "../services/file.service";

import * as async from "async";

//todo: to be replaced once additional traits are introduced
const TRAITS = [
  "Anime",
  "Cartoon",
  "Degen",
  "Modern",
  "Pixel",
  "Scifi",
  "Token",
];

export class EvaluationManager {
  private logger: Logger;
  private predictionService: PredictionService;
  private fileService: FileService;
  private beholderAdapter: BeholderAdapter;
  private repo: Repository;

  constructor(
    logger: Logger,
    predictionService: PredictionService,
    fileService: FileService,
    repository: Repository,
    beholderAdapter: BeholderAdapter
  ) {
    this.logger = logger;
    this.predictionService = predictionService;
    this.fileService = fileService;
    this.beholderAdapter = beholderAdapter;
    this.repo = repository;
  }

  async dump() {
    this.logger.log(`starting dump`);
    const nfts = await this.fileService.loadNfts();

    this.logger.log(`data - loaded - dumping ${nfts.length} records`);

    await this.repo.saveAssets(nfts);

    this.logger.log(`nfts saved!`);
  }

  formatProcessedTraits(
    mint: string,
    results: Float32Array
  ): { mint: string; trait: string; percentage: number }[] {
    const resultArray = Array.from(results);
    const mappedTraits = resultArray.map((value, index) => {
      return {
        mint,
        trait: TRAITS[index],
        percentage: parseInt((value * 100).toFixed(2)),
      };
    });

    return mappedTraits;
  }

  async run() {
    this.logger.log(`starting evaluation run`);

    const datas: Nft[] = await this.repo.getAssets();

    this.logger.log(`data loaded - evaluating ${datas.length} record(s)`);

    const processQueue = async.queue(async (data: Nft) => {
      const results = await this.predictionService.predict(
        data.image as string
      );
      if (results && results.length > 0) {
        try {
          const traits = this.formatProcessedTraits(data.mint, results);
          this.repo.saveProcessedTraits(data.mint, traits).then((result) => {
            if (result) {
              this.logger.log(
                `${data.mint} processed traits saved successfully`
              );
            } else {
              this.logger.error(`${data.mint} failed`);
            }
          });
        } catch (error) {
          this.logger.error(
            `${data.mint} something broke during evaluation!  `,
            error
          );
        }
      }
    }, 40);

    for (const data of datas) {
      processQueue.push(data);
    }

    await processQueue.drain();
  }
}
