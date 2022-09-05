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
        mint: "DFhHaxCDHV4SVHLmk6R1rAT2yfMwd13JJ8A7rhKyjZ5w",
        image:
          "https://bafybeib42yp2lsalmyw223bq4zesgcvmlkz6m54rrd643rvnn5njyt2jai.ipfs.nftstorage.link/632.jpeg?ext=jpeg",
      },
      {
        mint: "J5hkxFNNAw8WU32s8Mw4o1A32eGLXHVjaZsy79T4ifdC",
        image:
          "https://bafybeiawxlsigpzbxoqw26xe3b4c3fznblwnwj7lhlz6qchji37ecipmfa.ipfs.nftstorage.link/3747.jpeg?ext=jpeg",
      },
      {
        mint: "NaCDwRFnkaqZZovkq4ekvtJZ94yKeasUgSgm3AgSRyt",
        image: "https://66312712367123.com/98437.png",
      },
      {
        mint: "2GoRxBzxS9mfSZcYqRU5GPeeSZ7dqPFUYNJzn4b1WzkR",
        image:
          "https://www.arweave.net/tuHWtIQIavTfj481nFSxtnJxGEcgPR2mxDukawmxAbs?ext=png",
      },
      {
        mint: "FpJWFznwop3PAAeCdv4pezxcfrzJo4XBLWmJvrjLygk5",
        image:
          "https://testlaunchmynft.mypinata.cloud/ipfs/QmRvjGJQzruRwnrdL975DT2Skx3e2kbKVn5ybjTTqwJnv3/416.png",
      },
      {
        mint: "CArMXzHHnfktxdwmg5pdSnreH9Do6wmk8xTXseBYCet3",
        image:
          "https://www.arweave.net/R2BqtXuU9UJsXuPPIvslMARfQCYEwlARIhbPIUUVZLA?ext=png",
      },
    ];

    this.logger.log(`data loaded - evaluating ${datas.length} record(s)`);

    const pong = await this.beholderAdapter.getPong();
    this.logger.log(`PONG!`, pong);

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
