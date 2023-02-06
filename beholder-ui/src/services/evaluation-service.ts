import apiClient from "./client";
import { Asset, Trait } from "../types";

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

export const saveCollectedTraits = async (
  walletId: string,
  mint: string,
  collectedTraits: string[]
): Promise<boolean> => {
  try {
    const response = await apiClient.post("evaluator/save-collected-traits", {
      walletId,
      mint,
      collectedTraits,
    });

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.error(`error saving collected traits`, error);
  }

  return false;
};

export const getTraits = async (): Promise<Trait[]> => {
  try {
    const response = await apiClient.get("/traits");
    if (response.data) {
      return response.data as Trait[];
    }
  } catch (error) {
    console.error(`error getting traits`, error);
  }

  return [];
};
