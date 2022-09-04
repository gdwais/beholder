import { PrismaClient } from "@prisma/client"; 

export class PredictionRepo {

    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }


}