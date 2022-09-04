import { tensor } from "@tensorflow/tfjs";
import { command, run, string, positional } from "cmd-ts";

import { EvaluationManager } from "./managers/evaluation.manager";

const evaluationManager = new EvaluationManager();

const app = command({
  name: "beholder-cli",
  args: {
    processArg: positional({ type: string, displayName: "process" })
  },
  handler: async ({ processArg }) => {
    await evaluationManager.run();
  },
});

run(app, process.argv.slice(2));
