import apiClient from "./client";
import { Nft } from "../types";

export const getPredictionsByTrait = async (trait: string): Promise<Nft[]> => {
    try {
        const response = await apiClient.get(`/predictions/${trait}`);
        if (response.data) {
            return response.data as Nft[];
        }
    } catch(error) {
        console.error(`error getting predictions by trait`, error);
    }

    return [];
}