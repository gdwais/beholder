import apiClient from "./client";
import { Nft } from "../types";

export const getRandomNft = async (
  walletId: string
): Promise<Nft | undefined> => {
  try {
    const response = await apiClient.get(`/evaluator/${walletId}/random`);
    if (response.data) {
      return response.data as Nft;
    }
  } catch (error) {
    console.error(`error getting random nft`, error);
  }

  return;
};
