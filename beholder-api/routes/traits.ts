import { FastifyInstance, FastifyRequest } from "fastify";
import { Logger } from "../core/logger";
import { AssetRepository } from "../assets/asset.repository";
import { AssetService } from "../assets/asset.service";
import db from "../core/db";

const traitsRoute = (fastify: FastifyInstance, _: any, done: () => void) => {
  const service = new AssetService(new Logger(), new AssetRepository(db));

  fastify.get("/", async (request: FastifyRequest, reply) => {
    const result = await service.getTraits();
    reply.send(result);
  });

  done();
};

export default traitsRoute;
