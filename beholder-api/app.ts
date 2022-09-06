import fastify, {
  FastifyInstance,
  FastifyListenOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";


import ping from "./routes/ping";
import predictions from "./routes/predictions";
import dotenv from "dotenv";

const buildApp = (
  envFile: string
): FastifyInstance => {
  dotenv.config({
    path: `../${envFile}`,
  });

  const app = fastify({ logger: true });
  
  app.register(ping, { prefix: "/api/ping" });
  app.register(predictions, { prefix: "/api/predictions" });

  const port = process.env.PORT || "3000";

const listenOptions = {
  port: 3000,
  address: "0.0.0.0"
} as FastifyListenOptions;
  
  app.listen(listenOptions, () => {
    console.log(`Server Running at ${port} 🚀`);
  });

  return app;
};

export default buildApp;
