import app from "./app";

const PORT: any = process.env.PORT || 3000;
const fastify = app();

const start = async () => {
  try {
    await fastify.listen(PORT, "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
