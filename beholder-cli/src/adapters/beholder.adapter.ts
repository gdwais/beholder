import axios from "axios";

export type PredictionContract = {
    mint: string;
    image: string;
    results: Float32Array;
}

export class BeholderAdapter {
    
    private url: string = 'localhost:3000';

    async savePredictionData(contract: PredictionContract): Promise<Number> {
       const response = await axios.post(`${this.url}/save-prediction`, contract);
       return response.status;
    };
}