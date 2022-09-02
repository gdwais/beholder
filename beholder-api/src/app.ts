import fastify, { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({logger: true});

function build() {
    server.get('/ping', async (req, reply) => {
        return 'pong\n';
    });

    return server;
}

export default build;
