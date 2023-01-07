import apiClient from "./client";
import { Asset } from "../types";

export const getPredictionsByTrait = async (
  trait: string
): Promise<Asset[]> => {
  try {
    const response = await apiClient.get(`/predictions/${trait}`);
    if (response.data) {
      return response.data as Asset[];
    }
  } catch (error) {
    console.error(`error getting predictions by trait`, error);
  }

  return [];
};
