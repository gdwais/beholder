import apiClient from "./client";
import { PublicKey } from "@solana/web3.js";

export const loginUser = async (
  walletId: string,
  publicKey: PublicKey,
  nonce: number,
  signature: ((message: Uint8Array) => Promise<Uint8Array>) | undefined
): Promise<boolean> => {
  const response = await apiClient.post(
    "/login",
    {
      nonce,
      signature,
      publicKey,
      walletId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        nonce: nonce,
      },
    }
  );

  if (response.data && response.data.code) {
    // eslint-disable-next-line no-console
    console.error("Error", response.data, response.data.code);
    return false;
  }

  return true;
};
