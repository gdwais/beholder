import { FastifyInstance, FastifyRequest } from 'fastify';
import { Logger } from '../logger';
import { Repository } from '../repository';
import { Service } from '../service';
import db from "../db";

const traitsRoute = (fastify: FastifyInstance, _: any, done: () => void) => {

    const service = new Service(new Logger(), new Repository(db));

    fastify.get("", async (request: FastifyRequest, reply) => {
        const result = await service.getTraits();
        reply.send(result);
    });
    
    done();
};

export default traitsRoute;