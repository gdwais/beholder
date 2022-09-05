import { PrismaClient } from "@prisma/client";
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import { Logger } from "./logger";
import { Repository } from "./repository";
import { Service } from "./service";

const db = new PrismaClient();
const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: true });

interface PredictionContract {
  mint: string;
  image: string;
  results: Float32Array;
}

const repo = new Repository(db);

const service = new Service(new Logger(), repo);

function build() {

  server.post("/save-prediction", async (req: FastifyRequest<{Body: PredictionContract}>, reply: FastifyReply) => {
    const { mint, image, results } = req.body;

    const result = await service.savePrediction(mint, image, results);

    if (result === "success") {
      reply.statusCode = 200;
      reply.send();
    }

    reply.statusCode = 500;
    reply.send(result);

  });

  server.get("/ping", async (req, reply) => {
    return "pong\n";
  });

  return server;
}

export default build;
