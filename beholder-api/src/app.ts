import fastify, { FastifyInstance, FastifyRegisterOptions, FastifyRequest } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({logger: true});

type PredictionContract = {
    mint: string;
    image: string;
    results: Float32Array;
}




function build() {

    server.post('/save-prediction', async (req: FastifyRequest<{Body: PredictionContract}>, reply: FastifyReply) => {
        const data = reply.body;


    });

    server.get('/ping', async (req, reply) => {
        return 'pong\n';
    });

    return server;
}

export default build;
