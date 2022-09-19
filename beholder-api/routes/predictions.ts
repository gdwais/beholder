import { FastifyInstance, FastifyRequest } from 'fastify';
import { Logger } from '../logger';
import { Repository } from '../repository';
import { Service } from '../service';
import db from "../db";
import { TNft } from '../types';

export type PredictionContract = {
    mint: string;
    name: string;
    image: string;
    results: Float32Array;
}


const predictions = (fastify: FastifyInstance, _: any, done: () => void) => {
    
    const service = new Service(new Logger(), new Repository(db));
    
    fastify.get("", async (request: FastifyRequest, reply) => {
        const result: TNft[] = await service.getAll();
        reply.send(result);
    });

    // fastify.get("/:trait", async (request: FastifyRequest<{ Params: { trait: string }}>, reply) => {
    //     const { trait } = request.params;
    //     const result: TNft[] = await service.getTopNftsByTrait(trait);
    //     reply.send(result);
    // });

    // fastify.get("/:mint", async (request: FastifyRequest<{Params: { mint: string }}>, reply) => {
    //     const { mint } = request.params;
    //     const result = await service.getByMint(mint);
    //     reply.send(result);
    // });

    fastify.post("/save", async (request: FastifyRequest<{ Body: PredictionContract}>, reply) => {
        
        const { mint, image, name, results } = request.body;

        const result = await service.savePrediction(mint, image, name, results);
        
        if (result === "success") {
            reply.statusCode = 200;
        } else {
            reply.statusCode = 500;
        }
        reply.send({
            status: result
        });
    });
    
    done();
};

export default predictions;
