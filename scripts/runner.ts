import { PrismaClient } from "@prisma/client";

import { Logger } from "../beholder-api/core/logger";
import { AssetRepository } from "../beholder-api/assets";
import { EvaluationManager } from "../beholder-api/managers/evaluation.manager";
import { FileService } from "../beholder-api/services/file.service";
import { PredictionService } from "../beholder-api/services/prediction.service";

const db = new PrismaClient();

const logger = new Logger();

const evaluationManager = new EvaluationManager(
  logger,
  new PredictionService(),
  new FileService(),
  new AssetRepository(db)
);

type CliCommand = {
  command: string;
  action: (args?: string[]) => Promise<void>;
};

const cliCommands = [
  {
    command: "run",
    action: async (args?: string[]) => {
      await evaluationManager.run();
      return;
    },
  },
  {
    command: "dump",
    action: async (args?: string[]) => {
      await evaluationManager.dump();
      return;
    },
  },
] as CliCommand[];

const execute = async (commands: string[]) => {
  try {
    const cliCommand = cliCommands.find((c) => c.command === commands[0]);
    if (cliCommand) {
      await cliCommand.action();
      return;
    }

    logger.log("command not found");
  } catch (error) {
    logger.error("error running script", error);
  }
};

void execute(process.argv.slice(2));
