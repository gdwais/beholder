
import apiClient from "./client";
import { Trait } from "../types";

export const getTraits = async (): Promise<Trait[]> => {
    try {
        const response = await apiClient.get("/traits");
        if (response.data) {
            return response.data as Trait[];
        }
    } catch(error) {
        console.error(`error getting traits`, error);
    }

    return [];
}