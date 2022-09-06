import {
  BeholderAdapter,
  PredictionContract,
} from "../adapters/beholder.adapter";
import { Logger } from "../core/logger";
import { FileService } from "../services/file.service";
import { PredictionService } from "../services/prediction.service";

export class EvaluationManager {
  private logger: Logger;
  private predictionService: PredictionService;
  private fileService: FileService;
  private beholderAdapter: BeholderAdapter;

  constructor(
    logger: Logger,
    predictionService: PredictionService,
    fileService: FileService,
    beholderAdapter: BeholderAdapter
  ) {
    this.logger = logger;
    this.predictionService = predictionService;
    this.fileService = fileService;
    this.beholderAdapter = beholderAdapter;
  }

  async run() {
    this.logger.log(`starting evaluation run`);

    const datas = await this.fileService.loadNfts();

    this.logger.log(`data loaded - evaluating ${datas.length} record(s)`);

    for (const data of datas) {
      
      const results = await this.predictionService.predict(data.image as string);
      if (results && results.length > 0) {
        try {
          const status = await this.beholderAdapter.savePredictionData({
            mint: data.mint,
            name: data.name,
            image: data.image,
            results,
          } as PredictionContract);

          if (status === 200) {
            this.logger.log(`${data.mint} predictions saved successfully`);
          } else {
            this.logger.error(`${data.mint} failed with status `, status);
          }
        } catch (error) {
          this.logger.error(
            `${data.mint} something broke during evaluation!  `,
            error
          );
        }
      }
    }
  }
}
