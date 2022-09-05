import { command, run, string, positional } from "cmd-ts";
import { BeholderAdapter } from "./adapters/beholder.adapter";
import { Logger } from "./core/logger";

import { EvaluationManager } from "./managers/evaluation.manager";
import { PredictionService } from "./services/prediction.service";

const evaluationManager = new EvaluationManager(
  new Logger(),
  new PredictionService(),
  new BeholderAdapter()
);

const app = command({
  name: "beholder-cli",
  args: {
    processArg: positional({ type: string, displayName: "process" }),
  },
  handler: async ({ processArg }) => {
    await evaluationManager.run();
  },
});

run(app, process.argv.slice(2));
