import { PrismaClient } from "@prisma/client";
import { command, run, string, positional } from "cmd-ts";
import { BeholderAdapter } from "./adapters/beholder.adapter";
import { Logger } from "./core/logger";
import { Repository } from "./core/repository";

import { EvaluationManager } from "./managers/evaluation.manager";
import { FileService } from "./services/file.service";
import { PredictionService } from "./services/prediction.service";

const db = new PrismaClient();

const evaluationManager = new EvaluationManager(
  new Logger(),
  new PredictionService(),
  new FileService(),
  new Repository(db),
  new BeholderAdapter()
);

const app = command({
  name: "beholder-cli",
  args: {
    processArg: positional({ type: string }),
  },
  handler: async ({ processArg }) => {
    switch (processArg) {
      case "process": {
        await evaluationManager.run();
        break;
      }
      case "dump": {
        await evaluationManager.dump();
        break;
      }
    }
  },
});

run(app, process.argv.slice(2));
