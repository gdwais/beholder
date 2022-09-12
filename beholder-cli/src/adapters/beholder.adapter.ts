import axios from "axios";
import { resourceLimits } from "worker_threads";

export type PredictionContract = {
    mint: string;
    image: string;
    name: string;
    results: Float32Array;
}

export class BeholderAdapter {
    
    private url: string = 'http://localhost:3005/api';

    async getPong() {
        const response = await axios.get(`${this.url}/ping`);

        return response.data;
    }

    async savePredictionData(contract: PredictionContract): Promise<Number> {
       const response = await axios.post(`${this.url}/predictions/save`, contract);
       return response.status;
    };
}