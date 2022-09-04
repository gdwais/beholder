import {
  BeholderAdapter,
  PredictionContract,
} from "../adapters/beholder.adapter";
import { Logger } from "../core/logger";
import { PredictionService } from "../services/prediction.service";

export class EvaluationManager {
  private logger: Logger;
  private predictionService: PredictionService;
  private beholderAdapter: BeholderAdapter;

  constructor(
    logger: Logger,
    predictionService: PredictionService,
    beholderAdapter: BeholderAdapter
  ) {
    this.logger = logger;
    this.predictionService = predictionService;
    this.beholderAdapter = beholderAdapter;
  }

  async run() {
    this.logger.log(`starting evaluation run`);
    const datas = [
      {
        mint: "",
        image: "",
      },
    ];

    this.logger.log(`data loaded - evaluating ${datas.length} record(s)`);

    for (const data of datas) {
      const results = await this.predictionService.predict(data.image);
      if (results && results.length > 0) {
        try {
          const status = await this.beholderAdapter.savePredictionData({
            mint: data.mint,
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
