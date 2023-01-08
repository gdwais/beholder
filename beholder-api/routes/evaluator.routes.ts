import { FastifyInstance, FastifyRequest } from "fastify";
import { AssetRepository } from "../assets";
import { AssetService } from "../assets/asset.service";
import db from "../core/db";
import { Logger } from "../core/logger";

const logger = new Logger();
const assetRepository = new AssetRepository(db);
const assetService = new AssetService(logger, assetRepository);

const evaluatorRoutes = (
  fastify: FastifyInstance,
  _: any,
  done: () => void
) => {
  fastify.get("/", async (request: FastifyRequest, reply) => {
    const result = await assetService.getAll();

    reply.statusCode = 200;
    reply.send(result);
  });

  fastify.get(
    "/:walletId/random",
    async (
      request: FastifyRequest<{ Params: { walletId: string } }>,
      reply
    ) => {
      const { walletId } = request.params;
      const result = await assetService.getRandom(walletId);

      reply.statusCode = 200;
      reply.send(result);
    }
  );

  fastify.post(
    "/evaluate",
    async (
      request: FastifyRequest<{
        Body: { mint: string; walletId: string; evaluationTraits: string[] };
      }>,
      reply
    ) => {
      const { mint, walletId, evaluationTraits } = request.body;

      await assetService.saveEvaluationAsset(mint, walletId, evaluationTraits);

      reply.statusCode = 200;
      reply.send(true);
    }
  );

  done();
};

export default evaluatorRoutes;
