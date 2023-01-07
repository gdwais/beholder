import apiClient from "./client";
import { Asset } from "../types";

export const getRandomNft = async (
  walletId: string
): Promise<Asset | undefined> => {
  try {
    const response = await apiClient.get(`/evaluator/${walletId}/random`);
    if (response.data) {
      return response.data as Asset;
    }
  } catch (error) {
    console.error(`error getting random nft`, error);
  }

  return;
};
